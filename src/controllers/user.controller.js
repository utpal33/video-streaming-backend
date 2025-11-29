import chalk from "chalk";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiREsponse.js";
import { removeLocalFile } from "../utils/removeLocalFile.js";


//  register function
const registerUser = asyncHandler(async (req, res) => {

    // get data from frontend
    // validate empty field and your validation check for each field
    // check for image and avatar if there 
        // save it into cloudinary
        // remove avatar from local server
        //  if not move ahead
    // create a user object in DB with all fields details
    // remove password and refresh token from response
    // check for user creation
    // send response to frontend


    //  get user detail from frontend
    const {fullname, email, password, username} = req.body;
    try {  
        // validation check
        if([fullname, email, password, username].some(field=> field.trim() === ""))
            throw new ApiError(400, "all fields are required");
    
        //  check user existance in database
        const existedUser = await User.find({
            $or : [
                {email},
                {username}
            ]
        });
    
        // handling images file
        // console.log(chalk.bgWhite(req.files));
        const avatarLocalPath = req.files?.avatar[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;    
        
        if(!avatarLocalPath) 
            throw new ApiError(400, "avatar is mandatory");
    
        // upload file in to cloudinary
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);

        console.log(chalk.bgWhite(JSON.stringify(avatar, null, 2)));
        
    
        if (!avatar) 
            throw new ApiError(500, "images failed to upload");
    
    
        const user = await User.create({
            fullname,
            email,
            username : username.toLowerCase(),
            password,
            avatar: avatar.url,
            coverImage:coverImage?.url || "",
        });
    
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
    
        if (!createdUser) {
            throw new ApiError(500, "user not created");
        }
        return res.status(201).json(
            new ApiResponse(200, createdUser, "user registerd successfully")
        )
    
    } catch (error) {
        removeLocalFile(avatarLocalPath);
        removeLocalFile(coverImageLocalPath);
        if(avatar?.public_id)
            await avatar.uploa
    }
});

// LogIn user function
const LoginUser = asyncHandler(async (req, res) => {
    // take username or email and password form the user
    //  validate it from the database 
        // user exist or not if exist then validate password is right or wrong.
        // if user does not exist throw adn error.

        // if user exist check role ("admin/user")
    // generate access and refresh token
    // send tokens in cookies

    // 1: receive data
    const {email, password} = req.body;

    if(email.trim() !== "" ){
        User.findOne()
    }

    
})



export { 
    registerUser,
    LoginUser
}