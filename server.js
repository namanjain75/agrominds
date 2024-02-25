import express from "express";
import bodyParser from "body-parser";
const app = express();
const port=8080;

// middelwares i required
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}/`);
})

export default app;