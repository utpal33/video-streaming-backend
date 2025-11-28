import chalk from "chalk";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const fileUploader = async function (localFilePath) {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto",
        })
        console.log(chalk.bgGreenBright('file uplades succesfully on clodinary'), response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath);        // remove file from local server
        console.log(chalk.bgRedBright('issue with file uploading', error));
        return null
    }
}