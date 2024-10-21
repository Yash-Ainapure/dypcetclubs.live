"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToCloudinary = exports.uploads = void 0;
exports.uploadClubLogo = uploadClubLogo;
exports.uploadEventImages = uploadEventImages;
exports.uploadPfp = uploadPfp;
exports.deleteOnCloudinary = deleteOnCloudinary;
const cloudinary_1 = require("cloudinary");
const env_config_1 = require("../config/env.config");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const fs = __importStar(require("fs"));
cloudinary_1.v2.config({
    cloud_name: env_config_1.config.CLOUD_NAME,
    api_key: env_config_1.config.API_KEY,
    api_secret: env_config_1.config.API_SECRET
});
function uploadPfp(localFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!localFilePath)
                return null;
            const response = yield cloudinary_1.v2.uploader.upload(localFilePath, {
                resource_type: "auto",
                folder: "profile pictures"
            });
            fs.unlinkSync(localFilePath);
            return {
                public_id: response.public_id,
                url: response.url,
            };
        }
        catch (error) {
            fs.unlinkSync(localFilePath);
            return null;
        }
    });
}
const uploadImageToCloudinary = (file) => {
    console.log(file);
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject('No file provided');
        }
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: 'club_images' }, (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result) {
                resolve(result.secure_url); // Returning the secure URL of the uploaded image
            }
        });
        uploadStream.end(file.buffer); // Send file buffer to Cloudinary
    });
};
exports.uploadImageToCloudinary = uploadImageToCloudinary;
function uploadClubLogo(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({ resource_type: 'auto' }, // Automatically determines the resource type
            (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result.secure_url); // Return the secure URL of the uploaded file
                }
            }).end(file.buffer); // Send the file buffer to Cloudinary
        });
    });
}
function uploadEventImages(localFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!localFilePath)
                return null;
            const response = yield cloudinary_1.v2.uploader.upload(localFilePath, {
                resource_type: "auto",
                folder: "event images"
            });
            fs.unlinkSync(localFilePath);
            return {
                public_id: response.public_id,
                url: response.url,
            };
        }
        catch (error) {
            fs.unlinkSync(localFilePath);
            return null;
        }
    });
}
function deleteOnCloudinary(public_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield cloudinary_1.v2.api.delete_resources([public_id]);
            console.log(response);
        }
        catch (error) {
            console.log("Error deleting resource:", error);
        }
    });
}
const uploads = (file) => {
    console.log(file);
    return new Promise((resolve) => {
        cloudinary_1.v2.uploader.upload(file, { resource_type: "auto" }, (result) => {
            resolve({ url: result.url, id: result.public_id });
        });
    });
};
exports.uploads = uploads;
