const Review = require("../models/Review");

exports.getReviews = async (pageNumber, pageSize, filterObj, sortObj) => {
  return await Review.aggregate([
    { $match: filterObj },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        content: 1,
        "user._id": 1,
        "user.firstName": 1,
        "user.lastName": 1,
        "user.avatarUrl": 1,
      },
    },
    { $sort: sortObj },
    { $skip: (pageNumber - 1) * pageSize },
    { $limit: pageSize },
  ]);
};

exports.createReview = async (model) => {
  return await Review.create(model);
};

exports.countReviews = async (filterObj) => {
  return await Review.find(filterObj).then((reviews) => {
    let averageStars = 0;
    for (let i = 0; i < reviews.length; i++) {
      averageStars += reviews[i].numOfStars;
    }
    return {
      totalItems: reviews.length,
      averageStars:
        reviews.length !== 0 ? (averageStars / reviews.length).toFixed(2) : 0,
    };
  });
};
