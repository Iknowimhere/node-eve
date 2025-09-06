import mongoose from "mongoose";
import Product from "./models/productModel.js"; 

const seedProducts = [
  {
    productName: "A4 Notebook",
    price: 120,
    category: "stationery",
    quantity: 50,
    isFastMoving: true,
  },
  {
    productName: "Ball Pen Pack",
    price: 60,
    category: "stationery",
    quantity: 200,
    isFastMoving: true,
  },
  {
    productName: "Steel Water Bottle",
    price: 450,
    category: "kitchen",
    quantity: 80,
    isFastMoving: true,
  },
  {
    productName: "Non-stick Frying Pan",
    price: 899,
    category: "kitchen",
    quantity: 30,
    isFastMoving: false,
  },
  {
    productName: "Bluetooth Headphones",
    price: 1999,
    category: "electronics",
    quantity: 25,
    isFastMoving: true,
  },
  {
    productName: "USB-C Charger",
    price: 699,
    category: "electronics",
    quantity: 60,
    isFastMoving: true,
  },
  {
    productName: "Casual T-Shirt",
    price: 499,
    category: "apparels",
    quantity: 100,
    isFastMoving: true,
  },
  {
    productName: "Denim Jeans",
    price: 1299,
    category: "apparels",
    quantity: 40,
    isFastMoving: false,
  },
  {
    productName: "Sticky Notes",
    price: 35,
    category: "stationery",
    quantity: 500,
    isFastMoving: true,
  },
  {
    productName: "LED Table Lamp",
    price: 750,
    category: "electronics",
    quantity: 15,
    isFastMoving: false,
  },
];

async function seedDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/productDB"); 
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log("Seeding successful!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

seedDB();
