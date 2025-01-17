const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function mongoConnect(){
    try{
        console.log("mongodb uri : ",process.env.MONGOD_URI)
        await mongoose.connect(process.env.MONGOD_URI);
        console.log("Database connection established....")
    } catch (error) {
        console.log("Database connection error...");
    }
}

module.exports = mongoConnect;