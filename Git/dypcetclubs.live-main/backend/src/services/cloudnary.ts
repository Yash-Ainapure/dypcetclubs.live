import { v2 as cloudinary } from 'cloudinary';
import { config } from "../config/env.config";
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });
import * as fs from 'fs';
cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET
});

interface UploadResponse {
    public_id: string;
    url: string;
}

async function uploadPfp(localFilePath: string): Promise<UploadResponse | null> {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "profile pictures"
        });
        fs.unlinkSync(localFilePath);
        return {
            public_id: response.public_id,
            url: response.url,
        };
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const uploadImageToCloudinary = (file: Express.Multer.File): Promise<string | null> => {
    console.log(file)
    return new Promise((resolve, reject) => {
        if (!file) {
          return reject('No file provided');
        }
    
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'club_images' },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            if (result) {
              resolve(result.secure_url); // Returning the secure URL of the uploaded image
            }
          }
        );
        uploadStream.end(file.buffer); // Send file buffer to Cloudinary
      });
};


async function uploadClubLogo(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: 'auto' }, // Automatically determines the resource type
            (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url); // Return the secure URL of the uploaded file
                }
            }
        ).end(file.buffer);  // Send the file buffer to Cloudinary
    });
}



async function uploadEventImages(localFilePath: string): Promise<UploadResponse | null> {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "event images"
        });
        fs.unlinkSync(localFilePath);
        return {
            public_id: response.public_id,
            url: response.url,
        };
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}



async function deleteOnCloudinary(public_id: string): Promise<void> {
    try {
        const response = await cloudinary.api.delete_resources([public_id]);
        console.log(response);
    } catch (error) {
        console.log("Error deleting resource:", error);
    }
}

const uploads = (file: any): any => {
    console.log(file)
    return new Promise((resolve) => {
        cloudinary.uploader.upload(
            file,
            { resource_type: "auto" },
            (result: any): any => {
                resolve({ url: result.url, id: result.public_id });
            }
        );
    });
};

export {
    uploadClubLogo,
    uploadEventImages,
    uploadPfp,
    deleteOnCloudinary,
    uploads,
    uploadImageToCloudinary
};