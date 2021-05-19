const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todohandlers = require('./routehandler/todohandler');
const userHandler = require('./routehandler/userHandler');
// express app initialization
const app = express();
dotenv.config();
app.use(express.json());

// db connection
mongoose
    .connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to db');
    })
    .catch((err) => console.log(err));
// middle war routehandler
app.use('/todo', todohandlers);
app.use('/user', userHandler);

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent()) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.use(errorHandler);

// server
app.listen(5000, (err) => {
    console.log(err);
});
