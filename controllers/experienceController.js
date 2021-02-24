const experienceService = require("../services/experienceService");

/* Controller for POST: /api/experiences */

exports.createExperience = async (req, res) => {
  const { _id } = req.user;
  const { title } = req.body;
  try {
    const experience = await experienceService.createExperience({
      hostId: _id,
      title,
    });
    return res.status(201).json({ experience });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessage: "Xảy ra lỗi khi tạo hoạt động",
        internalMessage: "Error occur while creating experience",
      },
    });
  }
};
