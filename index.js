'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./model/db');
const cat = require("./model/cats")
const user = require("./model/user")
const httpport = 3000;
const httspport = 8000;



app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


const https = require('https');
const http = require('http');

const fs = require('fs');

const sslkey = fs.readFileSync('../ssl-key.pem');
const sslcert = fs.readFileSync('../ssl-cert.pem');

const options = {
  key: sslkey,
  cert: sslcert
};


app.get("/", async (req, res) => {
  if (req.secure) {
    console.log("Hello from secure https");

  } else {
    console.log("Hello from normal http");

  }

  res.send( await cat.find().populate("owner"))
});

app.post("/cat", async(req, res) => {
  const myCat = await cat.create({name: "Cat-cat", age: 7, owner: "5e79c7a1eb46931db0be35b3"});
/*  const myuser = find;
  myuser.cats.push(myCat._id);
  save()*/
  res.send("Cat created with id: " + myCat._id)
  }
);

app.post("/user", async(req, res) => {
  const myuser = await user.create({name: "Mary", email: "m@met.fi", password: "abc"});
  res.send(`user creates with id: ${myuser._id}`)
});

/*
db.on("connected", () => {
  app.listen(port, () => console.log(`Example app listening on port ${httpport}!`));
  https.createServer(options, app).listen(httspport);

});*/




db.on("connected", () => {
/*  http.createServer((req, res) => {
    res.writeHead(301, { 'Location': `https://localhost:${httspport}${req.url}`});
  res.end();
}).listen(httpport);
  https.createServer(options, app).listen(httpport);*/

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  if (process.env.NODE_ENV === 'production') {
    const prod = require('./production')(app, process.env.PORT);
  } else {
    const localhost = require('./localhost')(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
  }


});




/*
https.createServer(options, app).listen(httspport);

app.listen(httpport, () => console.log(`Example app listening on port ${httpport}!`))*/
