const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const expressSession = require('express-session');
const { initializePassport } = require('./passportConfig');

const { connectMongo } = require('./db');

dotenv.config();

const app = express();
connectMongo();

initializePassport(passport);

app.use(expressSession({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth', authRoutes);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})