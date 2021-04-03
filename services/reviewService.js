const Review = require("../models/Review");

exports.getReviews = async (filterObj, sortObj) => {
  return await Review.aggregate([{ $match: filterObj }, { $sort: sortObj }]);
};

exports.createReview = async (model) => {
  return await Review.create(model);
};
