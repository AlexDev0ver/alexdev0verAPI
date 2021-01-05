const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const Question = require('./models/Question');
const AskedQuestion = require('./models/AskedQuestion');

const mongodbUri = process.env.mongodbUri;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser());


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

            app.post(`/questions`, async (req, res) => {
                const question = new AskedQuestion({
                    question: req.body.question
                })

                await question.save();

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.email,
                        pass: process.env.pass
                    }
                });

                const mailOptions = {
                    from: propcess.env.email,
                    to: 'salaris9315@gmail.com',
                    subject: 'New question from alexdev0ver.io',
                    text: res.body.question
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    error ? console.log(error) : console.log(`Email send: ${info.response}`)
                });

                res.json({ message: 'Thank you for asking. Alex will see your question soon.'})
            })
        });
    }

    catch (err) {
        console.log("Server error", err.message);
        process.exit(1);
    }
}


start();
