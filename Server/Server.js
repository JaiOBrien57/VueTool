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

//Launch the backend server
app.listen(2000, '0.0.0.0', () => {
    console.log("Server Started On Port 2000");
  });


app.post('/api/TestEndpoint', (req, res) => {
  
  console.log("Post Request Received:")
  FrontEndData = req.body.data
  res.json({"Server Response":"Success"});
})



app.get('/api/GetSheetsData',async (req,res)=>{

  console.log("Get Request Received:")

  const serviceAccountAuth = new JWT({
    email: "bot-423@ringed-hearth-368707.iam.gserviceaccount.com",
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKyPwZs/k2hzm7\nGiISfRh7Avgv/7Zu6kEHZM4pAgKdJ65g6K0uJ+4STtYTMgV/HUCruAUEpleKkp7q\nHpaO9S5DlG5s+38+xEpOIjkPJ5F5uRkh2etngkN/6zZKvCEhuvaJ3GSlNjQRMZz7\naSVChkru1rbLplYcO7bE4O/M8P4DKMAswOe/cd9kRt6jGJ9xZJvY1htQ252qR4Vi\n3dR81pD5ZJfoXICwdL4UXheGScK9zRv1MLl5v0psmT//BCf1Y33eo5VTwv5rM2wU\nUwUQDhs0N7UJyc9cAJmxSHeBphqImvPJ4IQcUr5O9+xgFOiDGiA/dJMtM46ELYpU\nYuME/okrAgMBAAECggEAHeCvBDp4JYiXAPJAwuibisRNPQU4I+9v1V8M4Q3ixLTs\nBGtD2OEZOqlS8VEVbj0pIiPi2WSI0Wn48BXBqR6Gyn48JuKHRQA20nxIW+tAi+ax\nxUMOZBnVSCunvCsr1oRtfrJyQcVStpXQw1oim0KeF8Ka/DZtyYsiyq85pcB8LIq5\nDLsB/L6jDs7WeN2jOeRU/hd91/3U9ZdnAz6IVRb2rAz0xV/gOlCfWZXwSMR89JI4\nUklTCdnZkhJrU4fQpGhz1NUBCCBm64C9UCJEGjvPzYxlD2CqihgvY03y2+ETli5i\nG1TDKm9rKn4Utdwaj0rxiAgNpOvMruwt8l1OXkL1AQKBgQD7re/7ZorltZ/GH8C6\nRFq8IKd2Vcncniaj0YmPkY5d8Kk556aIKBMwUNkO0URdnlW3QxWd6U57g5vobiEw\np2ft1XY81uLI0EzNDKoA9mMx6A7w0mXChnWlVXjr2IGMAzti3J48L+xxgNGaJyAZ\nPJlbJ0TxYYxIs2WxVKFz9boY2wKBgQDORCuFswbLg1W5E+JJFe6LB2Mj0/I7jFS4\n/LcC3HQ3MjTgYU2u4JcrgTSZmmHt5ZYEfyjAs/F1ucxqtX71SKa3xRJ3UVussxa+\n0jkhCcM/laUynlFVuNZr42km3dmzcgU0npnqn1cXuwcqCCcQuRnhpglN4rvNsm2T\n5PH8AktZ8QKBgHC/EAXwfwK+5Y+NA/qtynQCsOJ7Ng4GL0suAFD3pO6CdF0DYIAY\na9g2L7bKmrTRzJZnkBSIwubkI4DxbR7tr8pE2U4R+dB6OB2XscTym6dszNyndHy7\nXZKugpgtCoPdosn8CUrvMR371moXYvLLSewi4Gi+CWk8LK9POXDIQREHAoGBAMQ7\njKBU8rj5CLvcE+LuL5QrAgGa6RAH8K5RFpdtPk8ov69cQviFiKwF7xHXEyWtzywW\nAaJbTvNuQPCgHNmkNaANqATF7Q5/DruZ6mnpDMzYRGLExaJlB/F6V5Z3Z17Vsege\nn1XcI5JbB3TQbsH1J49KU/26IGuQPbl/DUxwrlkxAoGBAOuHTBx4X44IYVAfaFuh\nbZ/JJiBLax5krglL37YZU/0lL7wZdY309FamTPdWn1EfF75BZV8aVDxoe2nW8PBk\ngo4dDwgfChDAiBZtx19S82zd0628IcYQFn0fMAGNRYiUR0ROmrEr2s1jH7t9bRGH\nHELa0IWqILlp6aA+7og4/SOY\n-----END PRIVATE KEY-----\n",
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet('1rqVXjOautFu6PbzyJC-L00DWppbWMzPHE7siaiqY-H0', serviceAccountAuth);
  await doc.loadInfo();
  const AUsheet = doc.sheetsById["997969319"];
  const rows = await AUsheet.getRows({"options.offset":1});
  console.log("Sheets Data Gathered")

  const Rows = []
  let Count = -1

  rows.forEach(row=>{
    Count = Count+1
    let Data = row._rawData
    let sku = Data[0]
    let name = Data[1]
    let qty = Data[3]
    let mappedstatus = Data[4]
    let reebeloqty = Data[5]
    let reebelotarget = Data[6]
    let reebelomin = Data[7]
    let pricetowin = Data[8]
    let lostby = Data[9]
    let buyboxstatus = Data[10]
    let sheettarget = parseFloat(Data[22].toString().replace("$","").replace(",",""))
    let sheetmin = parseFloat(Data[23].toString().replace("$","").replace(",",""))
    let TestArray = [{'id':'0000','name':'testname'},{'id':'0000','name':'testname2'}]

    Rows.push({"id":Count,"sku":sku,"name":name,"qty":qty,"mappedstatus":mappedstatus,"reebeloqty":reebeloqty,"reebelotarget":reebelotarget,"reebelomin":reebelomin,"pricetowin":pricetowin,"lostby":lostby,"buyboxstatus":buyboxstatus,"sheettarget":sheettarget,"sheetmin":sheetmin,'expanddata':TestArray})
  });

  const Payload = {"rows":Rows}
  console.log(Payload)
  res.json(Payload);
})



