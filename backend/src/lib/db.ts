import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Mongodb connected", conn.connection.host);
    }
    catch(error){
        console.log("Error in connecting to db", error);
    }
}

export default connectDb;