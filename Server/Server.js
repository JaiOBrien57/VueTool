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
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
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

//Setting up Google Sheets API
async function GoogleSheetsSetup() {
  const serviceAccountAuth = new JWT({
    email: "bot-423@ringed-hearth-368707.iam.gserviceaccount.com",
    key: "4696d79ded89ee94fc66fa6a09844adadda5f360",
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const doc = new GoogleSpreadsheet('1rqVXjOautFu6PbzyJC-L00DWppbWMzPHE7siaiqY-H0', serviceAccountAuth);
  await doc.loadInfo();
  // const sheet = doc.sheetsById['1rqVXjOautFu6PbzyJC-L00DWppbWMzPHE7siaiqY-H0']
  // console.log(sheet.title);
  // console.log(sheet.rowCount);
}

GoogleSheetsSetup();

//Launch the backend server
app.listen(2000, () => {
    console.log("Server Started On Port 2000");
  });


app.post('/TestEndpoint', (req, res) => {
  
  console.log("Get Request Received:")
  
  FrontEndData = req.body.data
  
  res.json({"Server Response":"Success"});
})




