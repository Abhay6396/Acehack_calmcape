const jwt  = require("jsonwebtoken");
const Register = require("../models/Register");

const auth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, "mynameisabhaypratapsinghamernstackdeveloper");
        console.log(verifyUser);
        next();
    
    } catch (error) {
        res.render("loginform");
    }
}

module.exports = auth;