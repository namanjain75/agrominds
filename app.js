import app from "./server.js"
import db from "./dbconfig.js"
import bcrypt, { hash } from "bcrypt";
import session from "express-session";
import flash from "express-flash";


//middelwares

app.use(session(
    {
        secret:'secret',
        resave:false,
        saveUninitialized:false,

    }
));

app.use(flash())


//  handeling all the get request
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/disease_detection",(req,res)=>{
    res.render("disease_detection.ejs");
})

app.get("/pricing",(req,res)=>{
    res.render("pricing.ejs");
})

app.get("/aboutUs",(req,res)=>{
    res.render("aboutUs.ejs") ;
})

app.get("/login",(req,res)=>{
    res.render("login.ejs");
   
})

app.get("/register",(req,res)=>{
    res.render("register.ejs");
})


// handeling the post request for register page

app.post("/registerform",async (req,res)=>{
    let {name, email ,password ,passwordconfirm}= req.body
    let error=[];
    if(password!==passwordconfirm){
        error.push({message:"The password Dosen't Match "})
        // error=[];
        
    }
    else{
        // console.log({name, email,password,passwordconfirm});
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
                console.log(result.rows);

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
                            console.log(result.rows);
                            req.flash("success_msg","Successfully registered please login");
                            res.redirect("/login")
                        }
                    })
                }
            }
        );
    }

   

})








