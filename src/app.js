import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

// Handeling cross-origin request
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));

// Handeling and Limit json file size
app.use(express.json({limit:"20kb"}));

// Handeling and Limit URL Data
app.use(express.urlencoded({extended:true, limit:"16kb"}));

// Handeling and limit file size storing it on server
app.use(express.static("public"));

// Handeling cookies
app.use(cookieParser())


// touts import
import userRouter from './routes/user.routes.js'

// ROUTES
// also define the version of routes
//  Always use middleware to define routes in industry level

// routes declaration
app.use('/api/v1/users', userRouter)



export { app };
