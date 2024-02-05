const mongoose = require('mongoose');
require('dotenv').config();


const mongoURI = process.env.MONGO_URI;
const connetToMongo = async () => {
        try {
            await mongoose.connect(mongoURI);
            console.log("Connected to MongoDB successfully.\n");
          } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
          }
        };
module.exports = connetToMongo;