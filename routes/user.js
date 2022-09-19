const express = require("express");
const passport = require('passport');
const router = express.Router();

const { fileUpload, upload } = require('../controllers/userController');


router.post('/file', passport.authenticate('jwt', { session: false}), upload.array('file',3), fileUpload);


module.exports = router ;