const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('config');
const Question = require('./models/Question');

const port = config.get('port');
const mongodbUri = config.get('mongodbUri');

app.use(express.urlencoded({ extended: true }));

async function start() {
    try {
        await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(port, () => {
            console.log(`App started on port ${port} ...`)

            app.get('/questions', async (req, res) => {
                const questions = await Question.find();
                res.send(questions);
            });

            app.post(`/ask`, async (req, res) => {
                const question = new Question({
                    question: req.body.question,
                    answer: "Answer for that will be added soon"
                })

                await question.save();
                res.send(201, "Question was created! Alex will see it soon.")
            })
        });
    }

    catch (err) {
        console.log("Server error", err.message);
        process.exit(1);
    }
}


start();
