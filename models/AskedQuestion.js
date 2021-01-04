const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    question: {type: String, required: true, unique: true}
 })

 module.exports = model('AskedQuestion', schema);
