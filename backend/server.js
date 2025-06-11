const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Module Database
const db = require("./config/db");

// Route
const studentRoute = require("./routes/studentRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/api/nilai-app", studentRoute);

// Database connecting
db.getConnection().then(() => {
  // App running
  app.listen(PORT, async (err) => {
    if (err) return console.log("[-] Server Error: " + err);

    return console.log(`[+] Server successfully connecting on port: ${PORT}`);
  });
});
