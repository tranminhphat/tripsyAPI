const mongoose = require("mongoose");

exports.createFilteredUserObject = (filterArray) => {
  if (filterArray.length === 0) {
    return {};
  }

  return filterArray.reduce((filterObj, item) => {
    const splitedItem = item.split(":");
    console.log(splitedItem);
    const key = splitedItem[0];
    const value = splitedItem[1];

    const newFilterObject = { ...filterObj };
    if (key === "_id") {
      console.log(value);
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
    console.log(splitedItem);
    const key = splitedItem[0];
    const value = splitedItem[1];

    const newFilterObject = { ...filterObj };
    if (key === "hostId") {
      console.log(value);
      newFilterObject[key] = mongoose.Types.ObjectId(value);
    } else {
      newFilterObject[key] = value;
    }

    return newFilterObject;
  }, {});
};
