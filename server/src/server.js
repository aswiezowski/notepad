const express = require('express')
const bodyParser = require('body-parser');
var lastlogModule = require('./lastlog');
var filesModule = require('./files');
var textsModule = require('./texts');

var API_PREFIX = '/api';

const app = express();
app.use(bodyParser.json());
app.use(API_PREFIX + '/file', express.static('upload/'));
app.use('/', express.static('../view/build/'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(API_PREFIX + '/lastlog', lastlogModule);
app.use(API_PREFIX + '/files', filesModule);
app.use(API_PREFIX + '/texts', textsModule);