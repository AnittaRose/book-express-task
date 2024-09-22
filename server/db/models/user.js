const mongoose = require('mongoose');

const users = new mongoose.Schema({
    title : {
        type : String,
        // required : true,
    },
    publisher:{
        type : String,
        // required : true,
    },
    author:{
        type : String,
        // required : true,
    },
    price:{
        type : Number,
        // required : true,
    },
    description:{
        type : String,
        // required : true,
    },
    about:{
        type : String,
        // required : true,
    },
    released:{
        type :String,
        // required : true,
    },
    reviews:{
        type : Number,
        // required : true,
    },
    images:{
        type :String,
    },
    coverartist:{
        type : String,
        // required : true,
    }
})

module.exports = mongoose.model("users", users);