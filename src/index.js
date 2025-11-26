
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import chalk from 'chalk';
import { app } from './app.js';

// dotenv.config({path:'../.env'})
dotenv.config()

const PORT = process.env.PORT || 8000 ;


connectDB()         // because this function is async it returns a promise. to handle promise use .then and .catch method
.then(()=>{
    app.listen(PORT, ()=>{
        console.log((chalk.bgGreenBright`server is running and DB connected successfully at ${PORT}`));
    })
})
.catch(err=>
    console.log(chalk.bgRedBright(`MONGO_DB connection failed !! ${err}`))
)

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