const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    question: {type: String, required: true, unique: true},
    answer: {type: String}
 })

 module.exports = model('Question', schema);
