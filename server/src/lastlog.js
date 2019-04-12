const express = require('express');
const fs = require('fs');
var router = express.Router();
const lastlog_path = "data/lastlog.txt";

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ content: getDateFileContent() }));
});


router.post('/', async (req, res) => {
    saveLog(req.body, () => {
        res.status(200).json("ok");
    });
});

function getDateFileContent() {
    return fs.readFileSync(lastlog_path, { encoding: "utf-8" })
}

function saveLog(body, callback) {
    date = new Date(body.date);
    fs.appendFile(lastlog_path, "\n" + "[" + date.toISOString() + "] " + body.content, (err) => {
        if (err) {
            console.error(err);
        }
        callback();
    });
}

module.exports = router