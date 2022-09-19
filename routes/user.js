const express = require("express");
const passport = require('passport');
const router = express.Router();

const { fileUpload, upload, getFilesById } = require('../controllers/userController');


router.post('/files', passport.authenticate('jwt', { session: false}), upload.array('file',1), fileUpload);
router.get('/files', passport.authenticate('jwt', { session: false}), getFilesById);


module.exports = router ;