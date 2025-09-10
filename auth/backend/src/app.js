import express from 'express'
import dbConnect from './config/db.js';
import authRoutes from './routes/auth.routes.js'
dbConnect()

let app=express()
//middlewares
app.use(express.json())
//base route
app.use("/api/auth",authRoutes)

export default app;