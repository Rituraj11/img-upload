const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const expressSession = require('express-session');
const { initializePassport } = require('./passport-config');

const { connectMongo } = require('./db');

dotenv.config();

const app = express();
connectMongo();

initializePassport(passport);

// app.use(expressSession({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
// app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/images', express.static('./images'))

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})