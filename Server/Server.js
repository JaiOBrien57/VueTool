const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
var bodyParser = require("body-parser");
const axios = require("axios");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { google } = require('googleapis');
const { logging } = require("googleapis/build/src/apis/logging");
const { nextTick } = require("process");
var winston = require('winston'), expressWinston = require('express-winston');


//Setup middleware
app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  }));

//Setting up the app background vars
app.use(cors());
app.disable("etag");
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json());
app.use(express.json());

//Launch the backend server
app.listen(2000, () => {
    console.log("Server Started On Port 2000");
  });

//To setup public access see below
//https://www.reddit.com/r/node/comments/51pf93/how_can_i_access_my_express_nodejs_server_through/
//Access on ******* http://api.renewablemobile.com.au:2000/


  app.post('/TestEndpoint', (req, res) => {
    console.log("Get Request Received:",req.body)
    res.json({"Server Response":"Success"});
  })
