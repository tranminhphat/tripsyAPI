const mongoose = require("mongoose");

exports.createFilteredUserObject = (filterArray) => {
  if (filterArray.length === 0) {
    return {};
  }

  return filterArray.reduce((filterObj, item) => {
    const splitedItem = item.split(":");
    const key = splitedItem[0];
    const value = splitedItem[1];

    const newFilterObject = { ...filterObj };
    if (key === "_id") {
      newFilterObject[key] = mongoose.Types.ObjectId(value);
    } else {
      newFilterObject[key] = value;
    }

    return newFilterObject;
  }, {});
};

exports.createFilteredExperienceObject = (filterArray) => {
  if (filterArray.length === 0) {
    return {};
  }

  return filterArray.reduce((filterObj, item) => {
    const splitedItem = item.split(":");
    const key = splitedItem[0];
    const value = splitedItem[1];

    const newFilterObject = { ...filterObj };
    if (key === "hostId" || key === "_id") {
      newFilterObject[key] = mongoose.Types.ObjectId(value);
    } else {
      newFilterObject[key] = value;
    }

    return newFilterObject;
  }, {});
};

exports.createFilteredReceiptObject = (filterArray) => {
  if (filterArray.length === 0) {
    return {};
  }

  return filterArray.reduce((filterObj, item) => {
    const splitedItem = item.split(":");
    const key = splitedItem[0];
    const value = splitedItem[1];

    const newFilterObject = { ...filterObj };
    if (
      key === "hostId" ||
      key === "_id" ||
      key === "experienceId" ||
      key === "guestId" ||
      key === "activityId"
    ) {
      newFilterObject[key] = mongoose.Types.ObjectId(value);
    } else {
      newFilterObject[key] = value;
    }

    return newFilterObject;
  }, {});
};

exports.createFilteredActivityObject = (filterArray) => {
  if (filterArray.length === 0) {
    return {};
  }

  return filterArray.reduce((filterObj, item) => {
    const splitedItem = item.split(":");
    const key = splitedItem[0];
    const value = splitedItem[1];

    const newFilterObject = { ...filterObj };
    if (key === "hostId" || (key === "_id") | (key === "experienceId")) {
      newFilterObject[key] = mongoose.Types.ObjectId(value);
    } else {
      newFilterObject[key] = value;
    }

    return newFilterObject;
  }, {});
};

exports.createReturnFields = (data, fields) => {
  const fieldArray = fields.split(",");
  let returnFields = {};

  Object.keys(data).map((key) => {
    if (fieldArray.includes(key)) {
      returnFields[key] = data[key];
      return true;
    }
  });

  return returnFields;
};
