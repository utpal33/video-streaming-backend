import mongoose from "mongoose";
import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./db/index.js";

// dotenv.config({path:'../.env'})
dotenv.config()


connectDB()

/*

const app = express();
const PORT = process.env.PORT
console.log(PORT, 'port');



;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on('error',(error)=> console.log('error', error)
        );
        // throw error;

        app.listen(PORT,()=>console.log(`server is running on port : `, PORT)
)
    } catch (error) {
        console.log('errr', error);
        // throw error
        process.exit(1)
        
    }
})()
*/