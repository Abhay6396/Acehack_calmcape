const mongoose = require("mongoose");

const regschema = mongoose.Schema({
    "name":{
        type : String,
        required : true
    },
    "email":{
        type : String,
        required : true
    },
    "phone":{
        type : Number,
        required : true
    },
    "password":{
        type : String,
        required : true
    }
});

const StdModel = new mongoose.model("StdModel",regschema);

module.exports = StdModel;

