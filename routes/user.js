const express = require("express");
const passport = require('passport');
const router = express.Router();

// const { isAuthenticated } = require('../passportConfig');
const { fileUpload, upload } = require('../controllers/userController');
// const { getToken, isAuthenticated } = require('../passport-config');


router.post('/file', passport.authenticate('jwt', { session: false}),upload.array('file',3), fileUpload);
// router.get('/profile',passport.authenticate('jwt', { session: false}),(req, res) => {
//     res.send({message: 'profile data',data: req.user})
// })

module.exports = router ;