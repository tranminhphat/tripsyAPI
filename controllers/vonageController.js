const Vonage = require("@vonage/server-sdk");
const vonage = new Vonage({
  apiKey: "e61058a9",
  apiSecret: "ChSQkKW8vo2li2Ny",
});

/* Controller for POST: /api/vonage/verify */
exports.createVerify = (req, res) => {
  const { number } = req.body;

  try {
    vonage.verify.request(
      {
        number,
        brand: "Tripsy",
      },
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).json({});
        } else {
          const verifyRequestId = result.request_id;
          return res.status(200).json({ id: verifyRequestId });
        }
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
};

/* Controller for POST: /api/vonage/verify/:token */
exports.verifyToken = (req, res) => {
  const id = req.body.id;
  const token = req.params.token;

  try {
    vonage.verify.check(
      {
        request_id: id,
        code: token,
      },
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).json({});
        } else {
          return res.status(200).json({ response: result });
        }
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
};
