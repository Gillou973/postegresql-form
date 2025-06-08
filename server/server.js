const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/adduser", (req, res) => {
  const username = req.body["username"]
  const password = req.body["password"]

  console.log("Username:" + username);
  console.log("Password:" + password);

  const insertSTMT = `INSERT INTO accounts (username, password) VALUES ('${username}', '${password}');`;

  pool
  .query(insertSTMT)
  .then((response) => {
    console.log("Data saved");
    console.log(response);
  })
  .catch((err) => {
    console.log(err)
  });

  console.log(req.body);
  res.send("Response received: " + req.body)
});
 
app.listen(4000, () => console.log("server on loclahost:4000"));


