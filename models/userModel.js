const mongoose = require('mongoose');

const File = require('./fileModel');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    files: [{ type: Schema.Types.ObjectId, ref: File }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);