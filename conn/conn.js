const mongoose = require("mongoose");


const mongoURI =
  "mongodb+srv://user:user1234@cluster0.d2r89.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  // "mongodb+srv://user:user1234@cluster0.d2r89.mongodb.net/";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connect to Mongo Successfully");
    })
    .catch(() => {
      console.log("connection failed");
    });
};
module.exports = connectToMongo;
