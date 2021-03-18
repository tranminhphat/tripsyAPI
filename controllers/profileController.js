const profileService = require("../services/profileService");

/* Controller for GET: /api/profiles/id */

exports.getProfileById = async (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;
  try {
    const profile = await profileService.getProfileById(id);
    if (fields) {
      const returnFields = serviceUtils.createReturnFields(
        profile._doc,
        fields
      );
      return res.status(200).json({ profile: returnFields });
    }

    return res.status(200).json({ profile });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessasge: "Hồ sơ không tồn tại",
        internalMessage: "Profile is not existed",
      },
    });
  }
};

/* Controller for POST: /api/profiles */

exports.createProfile = async (req, res) => {
  const { _id } = req.user;
  try {
    const profile = await profileService.createProfile({ userId: _id });
    return res.status(201).send(profile._id);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: {
        userMessage: "Xảy ra lỗi khi tạo hồ sơ",
        internalMessage: "Error occur while creating profile",
      },
    });
  }
};

/* Controller for PUT: /api/profiles/id */

exports.updateProfileById = async (req, res) => {
  const { id } = req.params;
  const updatedProperties = { ...req.body };

  try {
    const profile = await profileService.updateProfileById(id, {
      ...updatedProperties,
    });
    return res.status(200).json({ profile });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessage: "Lỗi trong khi cập nhật thông tin hồ sơ",
        internalMessage: "Error occur when updating profile",
      },
    });
  }
};
