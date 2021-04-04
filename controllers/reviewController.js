const reviewService = require("../services/reviewService");
const serviceUtils = require("../utils/ServiceUtils.js");
const Pagination = require("../utils/Pagination");

/* Controller for GET: /api/reviews */
exports.getReviews = async (req, res) => {
  const { filter, sort } = req.query;
  const pageNumber = Math.max(0, parseInt(req.query.pageNumber, 10)) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;
  const filterObject = serviceUtils.createFilteredActivityObject(
    filter ? JSON.parse(filter) : null
  );
  const sortObject = serviceUtils.createSortObject(sort);

  try {
    const reviews = await reviewService.getReviews(
      pageNumber,
      pageSize,
      filterObject,
      sortObject
    );
    console.log(reviews);
    const totalItems = await reviewService.countReviews(filterObject);

    const data = {
      items: reviews,
      pagination: new Pagination(pageNumber, pageSize, totalItems),
    };

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

/* Controller for POST: /api/reviews/ */
exports.createReview = async (req, res) => {
  const model = { ...req.body };
  const { _id: userId } = req.user;
  try {
    const review = await reviewService.createReview({ ...model, userId });
    return res.status(201).send(review._id);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessage: "Xảy ra lỗi khi tạo đánh giá",
        internalMessage: "Error occur while creating review",
      },
    });
  }
};

/* Controller for GET: /api/reviews/count */
exports.countReviews = async (req, res) => {
  const { filter } = req.query;
  const filterObject = serviceUtils.createFilteredActivityObject(
    filter ? JSON.parse(filter) : null
  );

  try {
    const data = await reviewService.countReviews(filterObject);
    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
  }
};
