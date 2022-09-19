const path = require('path');
const multer = require('multer');

const File = require('../models/fileModel');
const User = require('../models/userModel');


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

        const result = await newFiles.save();
        let fileId = result._id;

        const updateResult = await User.updateOne({_id: req.user._id}, {$push:{files: fileId}});

        return res.status(201).send({message: 'File uploaded'});

    }catch(err){
        return res.send({message: err})
    }
}

const getFilesById = async (req, res) => {
    try {
        const result = await User.findById(req.user._id).populate('files').exec();

        res.send(result);
    } catch (error) {
        console.log(error)
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
    limits: {fileSize: 500000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(fileTypes)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(fileTypes && mimeType){
            return cb(null, true)
        }
        cb('Please provide proper file format')
    },
    onError : function(err, next) {
        console.log('error', err);
        next(err);
      }
});

module.exports = { fileUpload, upload, getFilesById };

