const { uploadUserAvatar } = require("../services/uploadService");

/* Controller for POST: /api/upload/image */
exports.image = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await uploadUserAvatar(fileStr);
    res.status(200).json({ imageUrl: uploadedResponse.secure_url });
  } catch (err) {
    console.log(err);
  }
};
