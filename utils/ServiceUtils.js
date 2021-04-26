const mongoose = require("mongoose");

exports.createFilteredUserObject = (filterArray) => {
  if (!filterArray) {
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
  if (!filterArray) {
    return {};
  }

  return filterArray.reduce((filterObj, item) => {
    const splitedItem = item.split(":");
    const key = splitedItem[0];
    const value = splitedItem[1];

    const newFilterObject = { ...filterObj };
    if (key === "hostId" || key === "_id") {
      newFilterObject[key] = mongoose.Types.ObjectId(value);
    } else if (
      key === "groupSize" ||
      key === "duration" ||
      key === "bookingDate"
    ) {
      newFilterObject[key] = { $gte: Number(value) };
    } else if (key === "price") {
      const split = value.split(",");
      const minPrice = split[0];
      const maxPrice = split[1];
      newFilterObject["pricing.individualPrice"] = {
        $gte: Number(minPrice) * 1000,
        $lte: Number(maxPrice) * 1000,
      };
    } else if (key === "location") {
      newFilterObject["address.city"] = value;
    } else if (key === "title") {
      newFilterObject[key] = { $regex: `${value}`, $options: "i" };
    } else {
      newFilterObject[key] = value;
    }

    return newFilterObject;
  }, {});
};

exports.createFilteredReceiptObject = (filterArray) => {
  if (!filterArray) {
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
  if (!filterArray) {
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
      key === "experience.hostId"
    ) {
      newFilterObject[key] = mongoose.Types.ObjectId(value);
    } else {
      newFilterObject[key] = value;
    }

    return newFilterObject;
  }, {});
};

exports.createFilteredReviewObject = (filterArray) => {
  if (!filterArray) {
    return {};
  }

  return filterArray.reduce((filterObj, item) => {
    const splitedItem = item.split(":");
    const key = splitedItem[0];
    const value = splitedItem[1];

    const newFilterObject = { ...filterObj };
    if (key === "userId" || (key === "_id") | (key === "objectId")) {
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

exports.createSortObject = (sortString) => {
  if (!sortString) {
    return { createdAt: -1 };
  }

  return sortString.split("|").reduce((sortObj, item) => {
    const key = item.substr(1);
    const value = item.charAt(0) === "-" ? -1 : 1;

    const newSortObj = { ...sortObj };
    newSortObj[key] = value;
    return newSortObj;
  }, {});
};
