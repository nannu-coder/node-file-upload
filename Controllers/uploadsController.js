const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../Errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
// const uploadProductImageLocal = async (req, res) => {
//   if (!req.files) {
//     throw new BadRequestError("File does not exist");
//   }

//   const productImage = req.files.image;

//   if (!productImage.mimetype.startsWith("image")) {
//     throw new BadRequestError("Please upload an image");
//   }

//   const maxSize = 1000;

//   if (productImage.size > maxSize) {
//     throw new BadRequestError("Image size must be greater than 5mb");
//   }

//   const filePath = path.join(
//     __dirname,
//     "../public/uploads/" + `${productImage.name}`
//   );
//   await productImage.mv(filePath);
//   console.log(req.files);
//   res
//     .status(StatusCodes.OK)
//     .json({ image: { src: `/uploads/${productImage.name}` } });
// };

const uploadProductImage = async (req, res) => {
  console.log(req.files.image);

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(StatusCodes.OK).json({ src: result.secure_url });
};

module.exports = uploadProductImage;
