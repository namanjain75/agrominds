import app from "./server.js"
import axios from "axios";
import db from "./dbconfig.js"
import {initialize} from "./passportConfig.js";
import bcrypt, { hash } from "bcrypt";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
let subscription;
let emailuser;
let logincheck=false;




//middelwares
initialize(passport);

app.use(session(
    {
        secret:'secret',
        resave:false,
        saveUninitialized:false,

    }
));

app.use(passport.initialize());

app.use(passport.session())

app.use(flash())


//  handeling all the get request
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/disease_detection",checkNotAuthenticated,isFree,(req,res)=>{
    res.render("disease_detection.ejs",{
        subscription:req.user.subscription
       
    });
})

app.get("/pricing",isloggedin,(req,res)=>{
    res.render("pricing.ejs",{
        logincheck,
        subscription
    });
    
})

app.get("/aboutUs",(req,res)=>{
    res.render("aboutUs.ejs") ;
})

app.get("/login",checkAuthenticated,(req,res)=>{
    res.render("login.ejs");
   
})

app.get("/register",checkAuthenticated,(req,res)=>{
    res.render("register.ejs");
})

app.get("/dashboard", checkNotAuthenticated ,(req,res)=>{
    subscription=req.user.subscription
    emailuser=req.user.email
   
    
    
    res.render("dashboard.ejs",{
        user:req.user.name,
        subscription
    })
})



app.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err){
            throw err;
        }
        req.flash("success_msg","Successfully Logged Out");
        logincheck=false;
    res.redirect("/login");
    

    }); 
    
    
})
 
app.get("/free",checkNotAuthenticated,(req,res)=>{

    //code for payment interface on succcessfull payent this query will be executed
    db.query( 
        `UPDATE users
        SET subscription = 'Free'
        WHERE email = $1;`,[emailuser],(err,result)=>{
            if(err){
                throw err;
            }
            console.log(result.rows);
        });

    //after payment and above process theis will get exeued
    res.redirect("/dashboard")
        
})

app.get("/standerd",checkNotAuthenticated,(req,res)=>{

    //code for payment interface on succcessfull payent this query will be executed
    db.query( 
        `UPDATE users
        SET subscription = 'Standard'
        WHERE email = $1;`,[emailuser],(err,result)=>{
            if(err){
                throw err;
            }
            console.log(result.rows);
        });

    //after payment and above process theis will get exeued
    res.redirect("/dashboard")
        
})
app.get("/premium",checkNotAuthenticated,(req,res)=>{

    //code for payment interface on succcessfull payent this query will be executed
    db.query( 
        `UPDATE users
        SET subscription = 'Premium'
        WHERE email = $1;`,[emailuser],(err,result)=>{
            if(err){
                throw err;
            }
            console.log(result.rows);});

    //after payment and above process theis will get exeued
    res.redirect("/dashboard")
        
})

app.get("/device",checkNotAuthenticated,(req,res)=>{
res.render("device.ejs",{
    subscription
})
})

app.get("/community",checkNotAuthenticated,(req,res)=>{
    res.render("community/community.ejs",{
        subscription,
    });
})

// this is a get req for chat
app.get('/api/chat', async (req, res) => {
    try {
        const message = req.query.message;
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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', // Replace with your OpenAI API key
                },
            }
        );

        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// handeling the post request for register page

app.post("/registerform",async (req,res)=>{
    let {name, email ,password ,passwordconfirm}= req.body
    let error=[];
    if(password!==passwordconfirm){
        error.push({message:"The password Dosen't Match "})
        // error=[];
        
    }
   

    if(error.length>0){
        res.render("register.ejs",{
            error
        })
    }
    else{
        // form validation has passed
        let hashedpassword = await bcrypt.hash(password,10)
        console.log(hashedpassword);

       

        db.query(
            `select * from users
            where email=$1 `,[email],(err,result)=>{
                if(err){
                    throw err;
                }
                // console.log(result.rows);

                if(result.rows.length>0){
                    error.push({message:"Email already register"})
                    res.render("register.ejs",{error});
                }
                else{
                    db.query(`INSERT INTO users (name,email,password)
                    VALUES ($1,$2,$3) returning id,password`,[name,email,hashedpassword],(err,result)=>{
                        if(err){
                            throw err
                        }
                        else{
                            // console.log(result.rows);
                            req.flash("success_msg","Successfully registered please login");
                            res.redirect("/login")
                        }
                    })
                }
            }
        );
    }
})


app.post("/login",passport.authenticate("local",{
    successRedirect:"/dashboard",
    failureRedirect:"/login",
    failureFlash:true
}))


// Function for authentication session
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
   
      return res.redirect("/dashboard");
      
    }
    
   
    next();
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    
    res.redirect("/login");
  }
  

  function isFree(req,res,next){
    subscription=req.user.subscription
    if(subscription=="Free"){
        return res.redirect("/dashboard");
    }
    next();
  }

  function isloggedin(req, res, next) {
    // subscription=req.user.subscription
    if (req.isAuthenticated()) {
      logincheck=true;
    }
    next();
    
    }







