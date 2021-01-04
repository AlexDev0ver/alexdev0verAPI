const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const questions = require('./routes/questions');
const mongodbUri = process.env.mongodbUri;
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    express.urlencoded({ extended: true});
    cors();
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

            app.use('/questions', questions)
        });
    }

    catch (err) {
        console.log("Server error", err.message);
        process.exit(1);
    }
}


start();
