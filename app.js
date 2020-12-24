const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Question = require('./models/Question');
const mongodbUri = process.env.mongodbUri;
const port = process.env.PORT || 5000;

app.use((req, res) => {
    express.urlencoded({ extended: true});
    res.header("Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
                res.send(200, questions);
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
