const cloudinary = require("cloudinary").v2;
const config = require("../config");

cloudinary.config({
  cloud_name: config.cloudinary.CLOUD_NAME,
  api_key: config.cloudinary.API_KEY,
  api_secret: config.cloudinary.API_SECRET,
});

exports.uploadUserAvatar = async (fileStr) => {
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "userAvatar",
  });
  return uploadedResponse;
};
