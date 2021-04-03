const activityService = require("../services/activityService");
const serviceUtils = require("../utils/ServiceUtils");

/* Controller for GET: /api/activities */

exports.getActivities = async (req, res) => {
  const { filter, sort } = req.query;
  const filterObject = serviceUtils.createFilteredActivityObject(
    filter ? JSON.parse(filter) : null
  );
  const sortObject = serviceUtils.createSortObject(sort);

  try {
    const data = await activityService.getActivities(filterObject, sortObject);
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

/* Controller for GET: /api/activities/id */

exports.getActivityById = async (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;

  try {
    const activity = await activityService.getActivityById(id);

    if (fields) {
      const returnFields = serviceUtils.createReturnFields(
        activity._doc,
        fields
      );
      return res.status(200).json({ activity: returnFields });
    }

    return res.status(200).json({ activity });
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

/* Controller for POST: /api/activities */

exports.createActivity = async (req, res) => {
  const { model } = req.body;
  try {
    const activity = await activityService.createActivity(model);
    return res.status(201).send(activity._id);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessage: "Xảy ra lỗi khi tạo hoạt động",
        internalMessage: "Error occur while creating activity",
      },
    });
  }
};

/* Controller for PUT: /api/activity/:id */

exports.updateActivityById = async (req, res) => {
  const { id } = req.params;
  const updatedProperties = { ...req.body };

  try {
    const activity = await activityService.updateActivityById(id, {
      ...updatedProperties,
    });
    return res.status(200).json({ activity });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessage: "Lỗi trong khi cập nhật thông tin hoạt động",
        internalMessage: "Error occur when updating activity",
      },
    });
  }
};

/* Controller for PUT: /api/activity/:id/update-guestlist */

exports.updateListOfGuestId = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const activity = await activityService.getActivityById(id);

  if (!activity) {
    return res.status(404).send();
  }

  const listOfGuestId = activity.listOfGuestId.map((obj) => obj.toString());

  const operator = listOfGuestId.includes(userId) ? "$pull" : "$addToSet";

  try {
    await activityService.updateListOfGuestId(id, userId, operator);
    return res.status(200).send(operator === "$pull" ? false : true);
  } catch (err) {
    console.error(err);
    return res.status(404).send();
  }
};

/* Controller for DELETE: /api/activity/:id */

exports.deleteActivityById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await activityService.deleteActivityById(id);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessage: "Lỗi trong khi xóa hoạt động",
        internalMessage: "Error occur when deleting activity",
      },
    });
  }
};
