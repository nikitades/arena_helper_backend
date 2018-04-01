const http = require('http');
const https = require('https');
const fs = require("fs");
const config = require('./config');

const tlsOptions = {
    key: fs.readFileSync('./tls/privkey.pem', 'utf8'),
    cert: fs.readFileSync('./tls/cert.pem', 'utf8'),
    fullchain: fs.readFileSync('./tls/fullchain.pem', 'utf8')
};

module.exports = (callback, httpPort = 80, httpsPort = 443) => {
    return http.createServer(callback).listen(httpPort) && https.createServer(tlsOptions, callback).listen(httpsPort) && console.log(`Server running at ` + httpPort + ` and ` + httpsPort);
};