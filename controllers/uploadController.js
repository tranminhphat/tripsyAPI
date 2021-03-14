const {
  uploadUserAvatar,
  uploadExperienceGalleryPhotos,
} = require("../services/uploadService");

/* Controller for POST: /api/upload/image */
exports.image = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const userId = req.body.userId;
    const uploadedResponse = await uploadUserAvatar(fileStr, userId);
    return res.status(200).json({ imageUrl: uploadedResponse.secure_url });
  } catch (err) {
    return res.status(500).json({
      error: {
        userMessage: "Xảy ra lỗi khi upload ảnh",
        internalMessage: "Error occur while uploading image",
      },
    });
  }
};

/* Controller for POST: /api/upload/gallery */

exports.experienceGalleryPhotos = async (req, res) => {
  try {
    const userId = req.body.userId;
    const experienceId = req.body.experienceId;
    const gallery = req.body.data;

    const uploadedResponse = await uploadExperienceGalleryPhotos(
      gallery,
      userId,
      experienceId
    );
    return res.status(200).json({ uploadedResponse });
  } catch (err) {
    return res.status(500).json({
      error: {
        userMessage: "Xảy ra lỗi khi upload ảnh",
        internalMessage: "Error occur while uploading image",
      },
    });
  }
};
