const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//create a storage configuration using the cloudinary configured above
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    //these formats are for images
    allowed_formats: ["jpg", "png", "gif", "jpeg", ""],
    //name of the folder on cloudinary
    folder: "project-management",
    // to accept other file types besides images
    //resource_type: "raw",
  },
});

// we export everything wrapped with multer, which will handle the actual files
module.exports = multer({ storage });