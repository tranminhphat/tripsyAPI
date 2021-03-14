const cloudinary = require("cloudinary").v2;
const config = require("../config");

cloudinary.config({
  cloud_name: config.cloudinary.CLOUD_NAME,
  api_key: config.cloudinary.API_KEY,
  api_secret: config.cloudinary.API_SECRET,
});

exports.uploadUserAvatar = async (fileStr, userId) => {
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "user",
    folder: `users/${userId}/avatar`,
  });
  return uploadedResponse;
};

exports.uploadExperienceGalleryPhotos = async (
  gallery,
  userId,
  experienceId
) => {
  const uploadedResponse = [];
  for (let i = 0; i < gallery.length; i++) {
    try {
      const uploadedPhoto = await cloudinary.uploader.upload(
        gallery[i].base64String,
        {
          upload_preset: "user",
          folder: `users/${userId}/experience/${experienceId}/gallery`,
        }
      );
      uploadedResponse.push({
        type: gallery[i].type,
        url: uploadedPhoto.secure_url,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return uploadedResponse;
};
