import express from "express";
import bodyParser from "body-parser";
const app = express();
const port=8080;

//middelwares 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/disease_detection",(req,res)=>{
    res.render("disease_detection.ejs")
})

app.get("/pricing",(req,res)=>{
    res.render("pricing.ejs")
})

app.get("/aboutUs",(req,res)=>{
    res.render("aboutUs.ejs") 
})

app.get("/login",(req,res)=>{
    res.render("login.ejs")
   
})

app.get("/register",(req,res)=>{
    res.send("regestration page"); 
})

app.listen(port,()=>{
    console.log(`The server is started on port ${port}`);
})


