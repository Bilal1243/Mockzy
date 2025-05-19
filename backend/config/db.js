import mongoose from "mongoose";


const connectDb = async()=>{
    try {
        let connect = await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected successfully')
    } catch (error) {
        console.log(error)
    }
}


export default connectDb