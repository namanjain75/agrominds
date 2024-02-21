import pg from "pg";


const db= new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"AgroLogin",
    password:"1234",
    port:5432
})

db.connect();

export default db;