import express from 'express'
import dbConnect from './config/db.js';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import cors from 'cors'
dbConnect()

let app=express()
//middlewares
app.use(express.json())
app.use(cors({origin:"http://localhost:5173"}))
//base route
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

export default app;