const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/adduser", (req, res) => {
   console.log(req.body);
  res.send("Response received: " + req.body)
});
 

app.listen(4000, () => console.log("server on loclahost:4000"));



/* const express = require ("express")
const port = process.env.PORT || 3001

const app = express ();

app.get("/", (req, res) => {
  //res.status(200).json("Hello Gillou !")
  //res.send("Hello Gillou !")
  //res.status(404).send("Page non trouvée !")
  res.status(200).json({
    id: 1,
    user: "Gillou",
    age: 48
  })
})

app.listen(port, () => {
  console.log("Serveur est en ligne !");
}); */



/* import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

app.post('/api/form', async (req, res) => {
  const { nom, prenom, adresse, email, telephone, dateCreation } = req.body;

  try {
    await pool.query(
      `INSERT INTO contacts (nom, prenom, adresse, email, telephone, date_creation)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nom, prenom, adresse, email, telephone, dateCreation]
    );
    res.status(201).json({ message: 'Data inserted' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
 */