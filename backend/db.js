const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://happydobariya214:Happy0101@inotebook-db.oinqi.mongodb.net/";
const connetToMongo = async () => {
        try {
            await mongoose.connect(mongoURI);
            console.log("Connected to MongoDB successfully.\n");
          } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
          }
        };
module.exports = connetToMongo;