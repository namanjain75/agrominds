import express from "express";
import bodyParser from "body-parser";
const app = express();
const port=8080;

// middelwares i required
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port,()=>{
    console.log(`The server is started on port ${port}`);
})

export default app;