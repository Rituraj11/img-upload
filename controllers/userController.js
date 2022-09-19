const path = require('path');
const fs = require('fs');
const multer = require('multer');

const File = require('../models/fileModel');


const fileUpload = async (req, res) => {

    let paths = [];

    if(req.files.length !== 0){
        req.files.map(file => {
            paths.push(file.path)
        });
    }

    try{  

        let fileData = {
            name: req.body.name,
            file: paths.toString(),
            userId: req.user
        }
        
        const newFiles = new File(fileData);

        await newFiles.save();
        return res.status(201).send({message: 'File uploaded'});

    }catch(err){
        return res.send({message: err})
    }
}



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: '5000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(fileTypes)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(fileTypes && mimeType){
            return cb(null, true)
        }
        cb('Please provide proper file format')
    }
});

module.exports = { fileUpload, upload };

