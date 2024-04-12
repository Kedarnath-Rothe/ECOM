const mongoose = require('mongoose');

require('dotenv').config();

const URI = process.env.MONGODB_URI;

const connectDB = async() => {
    try{ 
        // await mongoose.connect(URI);
        await mongoose.connect(URI);
        console.log("Connection successful to DB");
    }
    catch(error){
        console.log(error.message);
        console.error("database connection failed");
        process.exit(0);
    }
};

module.exports = connectDB; 