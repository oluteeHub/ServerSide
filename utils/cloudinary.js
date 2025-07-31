const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwxvqaiay",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;
