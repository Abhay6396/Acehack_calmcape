const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  "name":{
    type : String
  },
  "ques1": {
    type : Number
  },
  "ques2": {
    type : Number
  },
  "ques3": {
    type : Number
  },
  "ques4": {
    type : Number
  },
  "ques5": {
    type : Number
  },
  "ques6": {
    type : Number
  },
  "ques7": {
    type : Number
  },
  "ques8": {
    type : Number
  },
  "ques9": {
    type : Number
  },
  "ques10": {
    type : Number
  },
});

const Usertestmodel = new mongoose.model("Usertestmodel",testSchema);

module.exports = Usertestmodel;