require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const fileUpload = require("express-fileupload");
//Coudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const express = require("express");
const app = express();

//Paths
const connect = require("./DB/Connect");
const errorHandler = require("./middleware/ErrorHandler");
const notFound = require("./middleware/Not-Found");
const authRoute = require("./Routes/authRoute");
const productRoute = require("./Routes/ProductRoute");

//Middleware
app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", authRoute);
app.use("/api/v1/products", productRoute);

//Error Handler
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const startDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startDB();
