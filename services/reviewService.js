const Review = require("../models/Review");

exports.getReviews = async (filterObj) => {
  return await Review.aggregate([{ $match: filterObj }]);
};

exports.createReview = async (model) => {
  return await Review.create(model);
};
