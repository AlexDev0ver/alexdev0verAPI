const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Question = require('./models/Question');
const AskedQuestion = require('./models/AskedQuestion');
const mongodbUri = process.env.mongodbUri;
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    express.urlencoded({ extended: true});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

async function start() {
    try {
        await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(port, () => {
            console.log(`App started on port ${port} ...`)

            app.get(`/`, (req, res) => {
                res.send(`This is basic API application for alexdev0ver site.`)
            })

            app.get('/questions', async (req, res) => {
                const questions = await Question.find();
                res.json(questions);
            });

            app.post(`/ask`, async (req, res) => {
                const question = new AskedQuestion({
                    question: req.body.question
                })

                await question.save();
                res.json("Question was created! Alex will see it soon.")
            })
        });
    }

    catch (err) {
        console.log("Server error", err.message);
        process.exit(1);
    }
}


start();
