//Imports
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongo = require("./database/db");

//Authentication
const { auth, requiresAuth } = require("express-openid-connect");
require("dotenv").config();


const port = process.env.PORT || 3000;
const app = express();