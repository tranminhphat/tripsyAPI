const profileService = require("../services/profileService");
const themeService = require("../services/themeService");

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

/* Controller for PATCH: /api/profiles/id/save-experience/experienceId */
exports.saveExperience = async (req, res) => {
  const { id, experienceId } = req.params;

  const profile = await profileService.getProfileById(id);

  if (!profile) {
    return res.status(404).send();
  }

  const savedExperiences = profile.savedExperiences.map((obj) =>
    obj.toString()
  );

  const operator = savedExperiences.includes(experienceId)
    ? "$pull"
    : "$addToSet";

  try {
    const profile = await profileService.savedExperience(
      id,
      experienceId,
      operator
    );
    return res.status(200).json({ profile });
  } catch (err) {
    console.error(err);
    return res.status(404).send();
  }
};

/* Controller for PUT: /api/profiles/update-checkpoints */
exports.updateCheckpoints = async (req, res) => {
  const { profileId } = req.user;
  const { themeId } = req.body;

  try {
    const profile = await profileService.getProfileById(profileId);
    const theme = await themeService.getThemeById(themeId);
    const [{ points: currentPoints }] = profile.checkpoints.filter(
      (item) => item.themeId === themeId
    );
    if (currentPoints >= 100) {
      return res.status(200).json({
        theme: theme.value,
        previousPoints: currentPoints,
        currentPoints: currentPoints,
      });
    }

    const { checkpoints } = await profileService.updateCheckpoints(
      profileId,
      themeId
    );
    const [{ points: updatedPoints }] = checkpoints.filter(
      (item) => item.themeId === themeId
    );

    return res.status(200).json({
      theme: theme.value,
      previousPoints: currentPoints,
      currentPoints: updatedPoints,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
};
