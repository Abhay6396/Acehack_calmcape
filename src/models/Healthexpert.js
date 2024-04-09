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
    },
    "occuipation" :{
        type : String,
        required : true
    },
    "role" : {
        type : String,
        required : true
    }
});

const HealthModel = new mongoose.model("HealthModel",regschema);

module.exports = HealthModel;