const mongoose = require("mongoose");
const connection = mongoose.connect(
  "mongodb+srv://DeepChugh:rahul1234@cluster0.wskiikq.mongodb.net/deepanshu?retryWrites=true&w=majority"
);
module.exports = connection;
