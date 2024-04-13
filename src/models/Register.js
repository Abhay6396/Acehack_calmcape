const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    "tokens":[{
        "token":{
            type: String,
            required : true
        }
    }]
});

// genertaing tokens

regschema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()},"mynameisabhaypratapsinghamernstackdeveloper");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
        
    } catch (error) {
        res.send("token is not generated");
    }
}

// generating hash password

regschema.pre("save",async function(next){
    if(this.isModified("password")){
        console.log(this.password);
        this.password = await bcrypt.hash(this.password,10);
        console.log(this.password);
        next();
    }
});



const StdModel = new mongoose.model("StdModel",regschema);

module.exports = StdModel;

