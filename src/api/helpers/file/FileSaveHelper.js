import cloudinary from 'cloudinary';
import config from './CloudinaryConfig.js';
import streamifier from 'streamifier';

cloudinary.v2.config(config);

const saveImage = async (file) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'image',
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
          console.log(error);
        }
      },
    );
    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
  });
};

const saveVideo = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_large(
      file,
      {
        resource_type: 'video',
        folder: 'video',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};

export default {
  saveImage,
  saveVideo,
};
