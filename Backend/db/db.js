const mongoose = require("mongoose");

const connectDb = function () {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("connect DB");
    })
    .catch((err) => console.log(err));
};

module.exports = connectDb