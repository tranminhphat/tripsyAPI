const experienceService = require("../services/experienceService");
const serviceUtils = require("../utils/ServiceUtils");

/* Controller for GET: /api/experiences/ */

exports.getExperiences = async (req, res) => {
  const filterArray = JSON.parse(req.query.filter);
  const filterObject = serviceUtils.createFilteredExperienceObject(filterArray);

  try {
    const data = await experienceService.getExperiences(filterObject);
    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: {
        userMessage: "Không tải được dữ liệu",
        internalMessage: "Error occur when fetching data",
      },
    });
  }
};

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
