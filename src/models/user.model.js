import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        password : {
            type:String,
            required:[true, 'password is required'],
            min:[8, 'length must be 8-16 chars'],
            max:[16, 'length must be 8-16 chars'],
        },
        email:{
            type : String,
            required : true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type : String,
            required : true,
            trim : true,
            index :true 
        },
        watchHistory:[
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Video",
            }
        ],
        coverImage:{
            type: String,          // cloudinary URL
        },
        avatar : {
            type : String,          // cloudinary URL
            required: true,
        },
        refreshToken : {
            type : String
        }
    }, 
    {
        timestamps:true
    });

/*
    hash the password before saving into DB.
    To run anything just before interacting with DB mongoose have pre mothod 
    and  for just aftrer mongoose have post method 
*/
// pre mothod
// userSchema.pre(task_to_perform, a cb func to perform some logic just before)

/* 
userSchema.pre('save', function(next){
     this.password = bcrypt.hash(this.password, 10);         // do always wehen ever any field updated before saving
     next()
})
*/

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
})


// check if the password is correct or not. by inject some methods
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function (){
    jwt.sign (
        //payload
        {
            _id : this._id,
            fullname : this.fullname,
            email : this.email,
            username : this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : REFRESH_TOKEN_EXPIRY
        }
    )
};  

const User = mongoose.model('User', userSchema);

export {User};