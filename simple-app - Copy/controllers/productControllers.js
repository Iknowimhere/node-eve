import Product from "../models/productModel.js";

export const createProduct = async (req, res, next) => {
  let { productName, price, category } = req.body;
  try {
    await Product.create({
      productName,
      price,
      category,
    });
    res.redirect("/products")
  } catch (error) {
    console.log("error in create product route", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProducts = async (req, res, next) => {
  try {
    let query = {};
    // { "<field>": { "$regex": "pattern", "$options": "<options>" } }
    if (req.query.search) {
      query.productName = { $regex: req.query.search, $options: "i" };
    }
    //category
    let products = await Product.find(query);
    res.render("home", { products });
  } catch (error) {
    console.log("error in get product route", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: `No product with this ${id} found` });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.log("error in getting single product route", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ message: `Error updating product` });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("error in updating single product route", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: `No product with this ${id} found` });
      return;
    }
    res.status(204).json();
  } catch (error) {
    console.log("error in deleting single product route", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
