var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
const express = require('express')
const app = express()
var API = require('./api/api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
require('./route/routes.js')(app);

app.listen(3000, () => console.log('Bot API listening on port 3000!'))
