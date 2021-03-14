const { Router } = require("express");
const router = Router();
const uploadController = require("../controllers/uploadController");

router.post("/image", uploadController.image);
router.post("/gallery", uploadController.experienceGalleryPhotos);

module.exports = router;
