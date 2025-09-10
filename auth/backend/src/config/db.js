import mongoose from 'mongoose'

async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected");
    } catch (error) {
        console.log("error in db",error.message);
    }
}


export default dbConnect;