const akin = require("@asymmetrik/akin");

exports.addActivityLog = async (userId, experienceId) => {
  await akin.activity.log(userId, experienceId, { type: "experience" }, "like");
  await akin.run();
  console.log(await akin.recommendation.getAllRecommendationsForUser(userId));
};

exports.removeActivityLog = async (userId, experienceId) => {
  await akin.activity.removeLog(userId, experienceId, "like");
  await akin.run();
  console.log(await akin.recommendation.getAllRecommendationsForUser(userId));
};

exports.getRecommendForUserId = async (userId) => {
  return await akin.recommendation.getAllRecommendationsForUser(userId);
};
