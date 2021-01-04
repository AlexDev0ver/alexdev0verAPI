const express = require('express');
const router = express.Router();
const cors = require('cors');

const Question = require('../models/Question');
const AskedQuestion = require('../models/AskedQuestion');


router.use((req, res, next) => {
  cors();
  next();
});

router.get('/questions', async (req, res) => {
    const questions = await Question.find();
    res.json(questions);
});

router.post(`/questions`, cors({"Access-Control-Allow-Origin": "*"}), async (req, res) => {
    const question = new AskedQuestion({
        question: req.body.question
    })

    await question.save();
    res.json({ message: 'Thank you for asking. Alex will see your question soon.'})
})

module.exports = router;
