const mongoose = require('mongoose');

const mongoURI = "mongodb://0.0.0.0:27017/iNotebook";
const connetToMongo = async () => {
        try {
            await mongoose.connect(mongoURI);
            console.log("Connected to MongoDB successfully.\n");
          } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
          }
        };
module.exports = connetToMongo;