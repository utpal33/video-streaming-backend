import chalk from "chalk";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import 
    import { ApiResponse } from "../utils/ApiREsponse.js";



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
    // console.log(chalk.greenBright(fullname, email, password, username));
    
    // validation check
    if(
        [fullname, email, password, username].some(field=> field.trim() === "")
    ) throw new ApiError(400, "all fields are required");

    //  check user existance in database
    const existedUser = User.find({
        $or : [
            {email},
            {username}
        ]
    });
    if (existedUser) throw new ApiError(408, 'email already exists');

    // handling images file
    console.log(chalk.bgWhite(req.files));
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLoaclPath = req.files?.coverImage[0]?.path;    
    
    if(!avatarLocalPath) throw new ApiError(400, "avatar is mandatory");

    // upload file in to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLoaclPath);

    if (!avatar) throw new ApiError(500, "images failed to upload");


    const user = await User.create({
        fullname,
        email,
        usernam:username.toLowercase(),
        password,
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) throw new ApiError(500, "user not created");

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registerd successfully")
    )
})


export { registerUser}