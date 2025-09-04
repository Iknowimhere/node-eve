import express from "express";
let router = express.Router();
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";

//create product

router.get("/home",(req,res,next)=>{
  let name="tom";
  res.render("home.ejs",{name})
})

router.post("/", createProduct);

//advanced search feature
router.get("/", getProducts);

//dymanic url
//route parametes--they are named url segments which can be captured
//The captured values are populated in the req.params object
router.get("/:id", getProduct);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
