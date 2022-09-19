const mongoose = require('mongoose');
const User = './userModel.js';

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: { type: String, required: true },
    file: { type: String, required: true},
    userId: { type: Schema.Types.ObjectId, ref: User }
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);