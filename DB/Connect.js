const mongoose = require("mongoose");

const connect = (url) => {
  mongoose.set("strictQuery", false);
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
