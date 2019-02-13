const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser');
var multer = require('multer')

var API_PREFIX = '/api';

const app = express();
app.use(bodyParser.json());
app.use(API_PREFIX+'/file', express.static('upload/'));
var upload = multer({ dest: 'upload_tmp/', limits: { fileSize: 5000000 } })

const port = process.env.SERVER_PORT || 5000;
const lastlog_path = "data/lastlog.txt";

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get(API_PREFIX+'/lastlog', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ content: getDateFileContent() }));
});


app.post(API_PREFIX+'/lastlog', (req, res) => {
    saveLog(req.body);
    res.status(200).json("ok");
});

function getDateFileContent() {
    return fs.readFileSync(lastlog_path, { encoding: "utf-8" })
}

function saveLog(body) {
    date = new Date(body.date);
    fs.appendFile(lastlog_path, "\n" + "[" + date.toISOString() + "] " + body.content, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

app.post(API_PREFIX+'/files', upload.array('file'), function (req, res, next) {
    req.files.forEach(file => {
        fs.rename(file.path, "upload/" + file.originalname, (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
    res.status(200).json("ok");
})

sortFunctions = {
    "name": function(x,y){return x.name.localeCompare(y.name);},
    "mtime": function(x,y){return x.mtimeMs - y.mtimeMs;},
    "size": function(x,y){return x.size - y.size;}
};
orderConst = {"ASC":0, "DESC":1};

app.get(API_PREFIX+'/files', function (req, res) {
    fs.readdir("upload", (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        sortFunc = sortFunctions[req.query.sort] || sortFunctions.mtime;
        order = orderConst[req.query.order] || orderConst.DESC;
        getAllFiles(sortFunc, order, files =>{
            res.status(200).json(files);
        })
    })
})

function getAllFiles(sortFunc, order, callback) {
    files = {};
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
        if(order==orderConst.DESC){
            filesStats.reverse();
        }
        callback(filesStats);
    })
}