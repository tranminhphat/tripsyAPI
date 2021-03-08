const { Router } = require("express");
const seedController = require("../controllers/seedController");
const router = Router();

router.get("/location/cities", seedController.getCities);
router.get("/location/districts", seedController.getDistrictsByCityName);
router.get("/location/wards", seedController.getWardsByDistrictName);

module.exports = router;
