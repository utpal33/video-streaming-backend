import chalk from "chalk";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadOnCloudinary = async function (localFilePath) {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto",
        });
        
        // delete file locally
        fs.unlinkSync(localFilePath);

        console.log(chalk.bgGreenBright('file uplades succesfully on clodinary'), response.url);

        return {
            ...response,
            rollback : async function(){
                try {
                    await cloudinary.uploader.destroy(this.public_id);
                } catch (error) {   
                    console.error(`clodinary file deletion failed : ${error.message}`);
                }
            }
        }
    } catch (error) {
        fs.unlinkSync(localFilePath);        // remove file from local server
        console.log(chalk.bgRedBright('issue with file uploading', error));
        return null
    }
};

{// write a file removal function for cloudinary else 
// add this same function with saved file response and return an object with response and an added function

// const removeFromCloudinary = async function(fileResponse) {
//     try {
//        const fileDelRes =  await cloudinary.uploader.destroy(fileResponse.public_id);
//     //     check if the file is delete or not
//     } catch (error) {
//         console.error(`clodinary delete failed :  ${error.message}`);
        
//     }
// }
}
export {
    uploadOnCloudinary,
    removeFromCloudinary
};