const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// databases

require("./db/conn");

// models
const StdModel = require("./models/Register");
const Usertestmodel = require("./models/Usertestmodel");
const HealthModel = require("./models/Healthexpert");
const port = process.env.port || 8000;
const partialpath = path.join(__dirname,"../views/partials");
const staticpath = path.join(__dirname,"../public");
console.log(staticpath);
app.use(express.static(staticpath)) 
hbs.registerPartials(partialpath);


app.set("view engine","hbs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("registrationform");
});
app.get("/login",(req,res)=>{
    res.render("loginform");
});
app.get("/registration",(req,res)=>{
    res.render("registrationform")
});
app.get("/home",(req,res)=>{
    res.render("index");
});
app.get("/analysis",(req,res)=>{
    console.log(req.cookies.jwt);
    res.render("analysisform");
});
app.get("/experts",(req,res)=>{
    res.render("Experts");
});

app.get("/sad",(req,res)=>{
    res.render("precribe",{
        "title" : "Feeling sad",
        "head" : "SAD",
        "text" : "Sadness is often addressed through therapy and self-care. Medication, like SSRIs (e.g., sertraline), may be considered for persistent or severe sadness, tailored to individual needs and responses."
    });
});
app.get("/happy",(req,res)=>{
    res.render("precribe",{
        "title" : "Feeling Happy",
        "head" : "Happy",
        "text" : "Happyness is often addressed through therapy and self-care. Medication, like SSRIs (e.g., sertraline), may be considered for persistent or severe sadness, tailored to individual needs and responses."
    });
});
app.get("/anxiety",(req,res)=>{
    res.render("precribe",{
        "title" : "Feeling Anxiety",
        "head" : "ANXIETY",
        "text" : "Anxiety is often addressed through therapy and self-care. Medication, like SSRIs (e.g., sertraline), may be considered for persistent or severe sadness, tailored to individual needs and responses."
    });
});
app.get("/depression",(req,res)=>{
    res.render("precribe",{
        "title" : "Feeling Anxiety",
        "head" : "ANXIETY",
        "text" : "Anxiety is often addressed through therapy and self-care. Medication, like SSRIs (e.g., sertraline), may be considered for persistent or severe sadness, tailored to individual needs and responses."
    });
});
app.get("/Bored",(req,res)=>{
    res.render("precribe",{
        "title" : "Feeling Bored",
        "head" : "BORED",
        "text" : "BORED is often addressed through therapy and self-care. Medication, like SSRIs (e.g., sertraline), may be considered for persistent or severe sadness, tailored to individual needs and responses."
    });
});
app.get("/cargame",(req,res)=>{
    res.render("cargame");
})
app.get("/bubblegame",(req,res)=>{
    res.render("bubblegame");
})
app.post("/registration",async (req,res)=>{
    try {
        
        const registerdata  = new StdModel({
            "name" : req.body.name,
            "email" : req.body.email,
            "phone" : req.body.phone,
            "password" : req.body.password,

        });

        const token = await registerdata.generateAuthToken();
        
        // save cookies
        // res.cookie("jwt",token,{
        //     expires: new Date(Date.now() + 50000),
        //     httpOnly : true
        // });

 
        const registred = await registerdata.save();
        res.status(200).render("loginform");


    } catch (error) {
        res.status(200).render("registrationform",{
            "error": "All fields are required"
        }); 
    }
    
});

app.post("/login",async (req,res)=>{
    try {
        const logData = await StdModel.findOne({"email": req.body.email});
        const confermPass = await bcrypt.compare(req.body.password,logData.password);
        console.log(confermPass);
        
        const token = await logData.generateAuthToken();
        res.cookie("jwt",token,{
            expires: new Date(Date.now() + 500000),
            httpOnly : true
        });

        

        if(confermPass){
            res.status(200).render("index");
        }
        else{
            res.status(200).render("wrongpass");
        }
    } catch (error) {
        res.status(400).send("invalid details");
    }
});

app.post("/analysis",async(req,res)=>{
    try {
        const testData = new Usertestmodel({
            "name" : req.body.name,
            "ques1" : req.body.ques1,
            "ques2" : req.body.ques2,
            "ques3" : req.body.ques3,
            "ques4" : req.body.ques4,
            "ques5" : req.body.ques5,
            "ques6" : req.body.ques6,
            "ques7" : req.body.ques7,
            "ques8" : req.body.ques8,
            "ques9" : req.body.ques9,
            "ques10" : req.body.ques10,
        });

        const testsaved = await testData.save();
        let totalScore = 0;
        const userReportData = await Usertestmodel.findOne({"name":req.body.name});
        totalScore += userReportData.ques1+userReportData.ques2+userReportData.ques3+userReportData.ques4+userReportData.ques5+userReportData.ques6+userReportData.ques7+userReportData.ques8+userReportData.ques9+userReportData.ques10;
        
        let severity = '';
        if (totalScore <= 10) {
            severity = 'Depressed';
            res.render("precribe",{
                "title" : "Feeling Depressed",
                "head" : "DEPRESSES",
                "text" : "Feeling depressed"
            });
          } else if (totalScore <= 15) {
            severity = 'anxiety';
            res.render("precribe",{
                "title" : "Feeling Anxiety",
                "head" : "ANXIETY",
                "text" : "Feeling anxiety"
            });

          } else if (totalScore <= 25) {
            severity = 'sad';
            res.render("precribe",{
                "title" : "Feeling sad",
                "head" : "SAD",
                "text" : "Feeling sad"
            });
          } else if(totalScore <= 30){
            severity = 'bored'
            res.render("precribe",{
                "title" : "Feeling Bored",
                "head" : "BORED",
                "text" : "Feeling BORED"
            });
          }else{
            severity = "happy"
            res.render("precribe",{
                "title" : "Feeling Happy",
                "head" : "HAPPY",
                "text" : "Feeling Happy"
            });
          }

    } catch (error) {
        res.status(400).send("wrong details");
    }
});

app.post("/report",async (req,res)=>{
    try {
        let totalScore = 0;
        const userReportData = await Usertestmodel.find({"name":req.body.name});
        res.render("report");
    } catch (error) {
        res.send("something went wrong");
    }
});

app.listen(port ,()=>{
    console.log(`Server is running at ${"http://127.0.0.1"}:${port}`);
});