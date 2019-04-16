const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');

var lastlogModule = require('./lastlog');
var filesModule = require('./files');
var textsModule = require('./texts');

const API_PREFIX = '/api';
const INDEX_PATH = path.resolve('../view/build/index.html');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(API_PREFIX + '/file', express.static('upload/'));
app.use(API_PREFIX + '/lastlog', lastlogModule);
app.use(API_PREFIX + '/files', filesModule);
app.use(API_PREFIX + '/texts', textsModule);

app.use('/static', express.static('../view/build/static'));
app.get('*', function(req, res) {
    res.sendFile(INDEX_PATH);
});