import "dotenv/config";
import express from "express";
import productRoutes from './routes/productRoutes.js'
let app = express();
import dbConnect from "./config/db.js";
dbConnect();



//middleware--parses incoming json data
app.use(express.json());

//base route
app.use("/products",productRoutes)

export default app;
