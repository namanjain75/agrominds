import express from "express";
import bodyParser from "body-parser";
const app = express();
const port=80;

//middelwares 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    // res.express.static("./index.html");
    // res.send("hello")
    
    
    res.render("index.ejs");
})

app.get("/disease_detection",(req,res)=>{
    // res.send("hello world");
    res.render("disease_detection.ejs")
})

app.get("/pricing",(req,res)=>{
    // res.send("pricing page");
    res.render("pricing.ejs")
})

app.get("/aboutUs",(req,res)=>{
    // res.send("pricing page");
    res.render("aboutUs.ejs")
   
})

app.get("/login",(req,res)=>{
    // res.send("pricing page");
    res.render("login.ejs")
   
})

app.get("/register",(req,res)=>{
    res.send("regestration page");
    // res.render("login.ejs")
   
})

app.listen(port,()=>{
    console.log(`The server is started on port ${port}`);
})
//exportig the module from the app
// module.exports = app;

