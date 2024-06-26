import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from 'dotenv';


dotenv.config({
    path: './.env'
})


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("No local file path provided.");
            return null;
        }

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })


        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) {
            console.log("image not found");
            return null;
        }

        //delete file from cloudinary
        const response = await cloudinary.uploader.destroy(public_id)

        // file has been deleted successfull
        console.log("file is deleted from cloudinary ", response);
        return response;

    } catch (error) {
        return null;
    }
}
export {uploadOnCloudinary, deleteFromCloudinary}