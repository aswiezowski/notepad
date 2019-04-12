const express = require('express')
const bodyParser = require('body-parser');
var lastlogModule = require('./lastlog');
var filesModule = require('./files');

var API_PREFIX = '/api';

const app = express();
app.use(bodyParser.json());
app.use(API_PREFIX + '/file', express.static('upload/'));

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(API_PREFIX + '/lastlog', lastlogModule);
app.use(API_PREFIX + '/files', filesModule);