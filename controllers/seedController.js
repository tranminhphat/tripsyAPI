/* Controller fot GET: /api/seeds/location/district */
const locationData = require("../seeds/location_data.json");

exports.getCities = (_, res) => {
  const cities = locationData.map((item) => item.Name);
  if (cities) {
    return res.status(200).json({ cities });
  } else {
    return res.status(500).json({
      error: {
        userMessage: "Lỗi hệ thống",
        internalMessage: "Can't get cities",
      },
    });
  }
};

exports.getDistrictsByCityName = (req, res) => {
  const { cityName } = req.query;
  console.log(cityName);
  const districts = locationData
    .filter((item) => item.Name === cityName)
    .map((item) => item.Districts)[0]
    .map((item) => item.Name);

  if (districts) {
    return res.status(200).json({ districts });
  } else {
    return res.status(500).json({
      error: {
        userMessage: "Lỗi hệ thống",
        internalMessage: "Can't get cities",
      },
    });
  }
};

exports.getWardsByDistrictName = (req, res) => {
  const { districtName, cityName } = req.query;
  const wards = locationData
    .filter((item) => item.Name === cityName)
    .map((item) => item.Districts)[0]
    .filter((item) => item.Name === districtName)
    .map((item) => item.Wards)[0]
    .map((item) => item.Name);

  if (wards) {
    return res.status(200).json({ wards });
  } else {
    return res.status(500).json({
      error: {
        userMessage: "Lỗi hệ thống",
        internalMessage: "Can't get cities",
      },
    });
  }
};
