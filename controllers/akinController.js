const akinService = require("../services/akinService");

/* Controller for POST: /api/akin/ */
exports.addActivityLog = async (req, res) => {
  const { userId, experienceId } = req.body;
  try {
    await akinService.addActivityLog(userId, experienceId);
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    return res.status(404).json({});
  }
};

/*Controller for DELETE: /api/akin */
exports.removeActivityLog = async (req, res) => {
  const { userId, experienceId } = req.body;
  try {
    await akinService.removeActivityLog(userId, experienceId);
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    return res.status(404).json({});
  }
};

/* Controller for GET: /api/akin/:id */
exports.getRecommendForUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const { recommendations } = await akinService.getRecommendForUserId(id);
    return res.status(200).json({ recommendations });
  } catch (err) {
    console.error(err);
    return res.status(404).json({});
  }
};
