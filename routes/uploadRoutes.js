const { Router } = require("express");
const router = Router();
const uploadController = require("../controllers/uploadController");

router.post("/avatar", uploadController.uploadUserAvatar);
router.post("/gallery", uploadController.experienceGalleryPhotos);
router.post("/idcard", uploadController.uploadIDCardPhotos);

module.exports = router;
