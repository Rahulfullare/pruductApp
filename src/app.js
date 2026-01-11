const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db.js");
const router = require("./routes/route.js");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

module.exports = app;   // ✅ ONLY export app
