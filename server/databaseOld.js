const { response } = require("express");
const {Pool} = require("pg")

const pool = new Pool({
    user : "postgres",
    password: "Marouini973",
    host: "localhost",
    port: 5432,
    database: "yt_login_system"
});

/* const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE 
}); */

const createTblQry = `CREATE TABLE accounts (
    user_id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) UNIQUE NOT NULL);`;

pool
    .query(createTblQry)
    //.query("CREATE DATABASE griffit_login_system2;")
    .then((Response)=>{
        console.log("Table Created with Succes !")
        //console.log("Database Created with Succes !")
        console.log(response)
    })
    .catch((err)=>{
        console.log(err);
    });

module.exports = pool;