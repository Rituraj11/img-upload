const express = require("express");
const passport = require('passport');
const router = express.Router();

const { register, login } = require('../controllers/authController');

router.get('/register',(req, res) => {
    res.send({message: 'hello'})
})

router.get('/profile',(req, res) => {
    res.send({message: 'logged in', data: req.user})
})

router.post('/register', register);
// router.post('/login',login);
router.post('/login', passport.authenticate('local',{ failureRedirect: '/api/auth/register'}),login);

module.exports = router ;