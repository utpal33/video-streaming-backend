import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import chalk from "chalk";  // for css without using css

// DB is on another continent
const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`);
        console.log(chalk.blueBright(`\n mongodb connected || DB_HOST ${connectionInstance.connect}`));
        
    } catch (error) {
        console.log(chalk.red.bold("mongodb connection failed") , error);
        process.exit(1)
    }
};

export default connectDB;