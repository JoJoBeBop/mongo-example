const https = require('https');
const http = require('http');
const fs = require('fs');

const sslkey = fs.readFileSync('../ssl-key.pem');
const sslcert = fs.readFileSync('../ssl-cert.pem');

const options = {
  key: sslkey,
  cert: sslcert
};

module.exports = (app, httpsPort, httpPort) => {
  https.createServer(options, app).listen(httpsPort);
  http.createServer((req, res) => {
    res.writeHead(301, {'Location': `https://localhost:${httsPort}${req.url}`});
    res.end();
  }).listen(httpPort);
};

