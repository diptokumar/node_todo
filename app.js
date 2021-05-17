const express = require('express');
const mongoose = require('mongoose');
const todohandlers = require('./routehandler/todohandler');
// express app initialization
const app = express();
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

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent()) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

// server
app.listen(5000, (err) => {
    console.log(err);
});
