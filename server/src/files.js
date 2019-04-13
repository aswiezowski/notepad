const express = require('express');
const fs = require('fs');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'upload_tmp/', limits: { fileSize: 5000000 } })

router.post('/', upload.array('file'), function (req, res, next) {
    req.files.forEach(file => {
        fs.rename(file.path, "upload/" + file.originalname, (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
    res.status(200).json("ok");
})

const sortFunctions = {
    "name": function (x, y) { return x.name.localeCompare(y.name); },
    "mtime": function (x, y) { return x.mtimeMs - y.mtimeMs; },
    "size": function (x, y) { return x.size - y.size; }
};
const orderConst = { "ASC": "asc", "DESC": "desc" };

router.get('/', function (req, res) {
        sortFunc = sortFunctions[req.query.sort] || sortFunctions.mtime;
        order = orderConst[req.query.order] || orderConst.DESC;
        getAllFiles(sortFunc, order, files => {
            res.status(200).json(files);
        })
})

function getAllFiles(sortFunc, order, callback) {
    fs.readdir("upload", (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        filesStats = [];
        files.forEach(name => {
            stats = fs.statSync("upload/" + name)
            filesStats.push({ "name": name, "mtime": stats.mtime, "size": stats.size, "mtimeMs": stats.mtimeMs });
        });
        filesStats.sort(sortFunc);
        if (order === orderConst.DESC) {
            filesStats.reverse();
        }
        callback(filesStats);
    })
}

module.exports = router