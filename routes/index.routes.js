const router = require("express").Router();
// importing what we did in cloudinary config
const fileUploader = require("../config/cloudinary");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post(
  "/upload",
  fileUploader.single("imgUrl"),
  async (req, res, next) => {
    // req.file
    if (!req.file) {
      next(new Error("No file uploaded"));
      return;
    }

    // req.file.path is the url of the file in cloudinary
    res.json({ fileUrl: req.file.path });
  }
);

module.exports = router;