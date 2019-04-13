const express = require('express');
const fs = require('fs');
var router = express.Router();

router.post('/', function (req, res) {
    const currentDate = new Date();
    const filename = currentDate.toISOString() + ".txt";
    fs.writeFile("upload/" + filename, req.body.text, (error)=>{
        if(error){
            console.error(error);
            res.status(400).json({status: 'Error while saving file'});
        } else{
            res.status(200).json({status: 'file saved', fileName: filename});
        }
    })

})


module.exports = router