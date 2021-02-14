/* Controller for POST: /api/upload/image */
exports.image = async (req, res) => {
  try {
    const fileStr = req.body.data;
    console.log(fileStr);
  } catch (err) {
    console.log(err);
  }
};
