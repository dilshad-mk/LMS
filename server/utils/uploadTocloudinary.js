
const cloudinary = require("../config/cloudinary");

const streamifier = require("streamifier");

const uploadToCloudinary = (fileBuffer, folder) => {

    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder
            },
            (error, result) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};

module.exports = uploadToCloudinary;