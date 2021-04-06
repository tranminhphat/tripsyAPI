const experienceService = require("../services/experienceService");
const serviceUtils = require("../utils/ServiceUtils");
const axios = require("axios");

/* Controller for GET: /api/experiences/ */

exports.getExperiences = async (req, res) => {
  const { filter, sort } = req.query;
  const filterObject = serviceUtils.createFilteredActivityObject(
    filter ? JSON.parse(filter) : null
  );
  const sortObject = serviceUtils.createSortObject(sort);

  try {
    const data = await experienceService.getExperiences(
      filterObject,
      sortObject
    );
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

/* Controller for GET: /api/experiences/id */

exports.getExperienceById = async (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;

  try {
    const experience = await experienceService.getExperienceById(id);

    if (fields) {
      const returnFields = serviceUtils.createReturnFields(
        experience._doc,
        fields
      );
      return res.status(200).json({ experience: returnFields });
    }

    return res.status(200).json({ experience });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessasge: "Trải nghiệm không tồn tại",
        internalMessage: "Experience is not existed",
      },
    });
  }
};

/* Controller for POST: /api/experiences */

exports.createExperience = async (req, res) => {
  const { _id } = req.user;
  try {
    const experience = await experienceService.createExperience({
      hostId: _id,
    });
    return res.status(201).send(experience.id);
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

/* Controller for PUT: /api/experiences/id */

exports.updateExperienceById = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  let updatedProperties = { ...req.body };

  if (updatedProperties.photoGallery) {
    try {
      const { data } = await axios.post(
        "http://localhost:2004/api/upload/gallery",
        {
          data: updatedProperties.photoGallery,
          experienceId: id,
          userId: _id,
        }
      );
      updatedProperties = {
        ...updatedProperties,
        photoGallery: data.uploadedResponse,
      };
    } catch (err) {
      console.error(err);
    }
  }
  try {
    const experience = await experienceService.updateExperienceById(id, {
      ...updatedProperties,
    });
    return res.status(200).json({ experience });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessage: "Lỗi trong khi cập nhật thông tin trải nghiệm",
        internalMessage: "Error occur when updating experience information",
      },
    });
  }
};

/* Controller for PUT: /api/experience/id/update-gallery */
exports.updatePhotoGallery = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: experienceId } = req.params;
  const { photo } = req.body;

  const experience = await experienceService.getExperienceById(experienceId);

  if (!experience) {
    return res.status(404).send();
  }

  try {
    const { data: uploadedResponse } = await axios.post(
      "http://localhost:2004/api/upload/gallery-photo",
      {
        data: photo,
        experienceId,
        userId,
      }
    );

    const experience = await experienceService.updateGallery(
      experienceId,
      uploadedResponse
    );
    return res.status(200).json({ experience });
  } catch (err) {
    console.log("here");
    console.error(err);
  }
};

/* Controller for DELETE: /api/experience/id */

exports.deleteExperienceById = async (req, res) => {
  const { id } = req.params;
  try {
    await experienceService.deleteExperienceById(id);
    return res.status(200).json({ message: "Xóa thành công" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: {
        userMessage: "Lỗi xảy ra khi xóa trải nghiệm",
        internalMessage: "Error occur while deleting experience",
      },
    });
  }
};
