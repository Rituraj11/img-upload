const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();


exports.connectMongo = () => {
    mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7946z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then( e => {
        console.log(`Connected to MongoDB: ${e.connection.host}`);
    })
    .catch(err => {
        console.log(err);
    });
}