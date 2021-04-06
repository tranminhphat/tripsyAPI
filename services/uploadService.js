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
    public_id: "userAvatar",
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
    if (!gallery[i].url) {
      try {
        const uploadedPhoto = await cloudinary.uploader.upload(
          gallery[i].base64String,
          {
            upload_preset: "user",
            folder: `users/${userId}/experience/${experienceId}/gallery`,
            public_id: gallery[i].type,
          }
        );
        uploadedResponse.push({
          type: gallery[i].type,
          url: uploadedPhoto.secure_url,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      uploadedResponse.push({
        type: gallery[i].type,
        url: gallery[i].url,
      });
    }
  }

  return uploadedResponse;
};

exports.uploadIDCardPhotos = async (userId, idCard) => {
  try {
    await cloudinary.uploader.upload(idCard.front, {
      upload_preset: "user",
      folder: `users/${userId}/idcard/`,
      public_id: "front-card",
    });
    await cloudinary.uploader.upload(idCard.back, {
      upload_preset: "user",
      folder: `users/${userId}/idcard/`,
      public_id: "back-card",
    });
  } catch (err) {
    console.log(err);
  }

  return true;
};
