const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');

const router = express.Router();
// eslint-disable-next-line new-cap
const Todo = new mongoose.model('Todo', todoSchema);

// get all todo using try block and async await
router.get('/', async (req, res) => {
    try {
        const data = await Todo.find({ status: 'active' });
        res.status(200).json({
            result: data,
            message: 'success',
        });
    } catch (e) {
        res.status(500).json({
            error: 'there is server side error',
        });
    }
});

// get single todo using callback
router.get('/:id', (req, res) => {
    Todo.find({ _id: req.params.id })
        .select({
            _id: 0,
            date: 0,
        })
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    error: 'there is server side error',
                });
            } else {
                res.status(200).json({
                    result: data,
                    message: 'success',
                });
            }
        });
});

// create todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'there is server side error',
            });
        } else {
            res.status(200).json({
                success: 'Data inserted successfully',
            });
        }
    });
});

// create multiple todo

router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: 'there is server side error',
            });
        } else {
            res.status(200).json({
                success: 'Data inserted successfully',
            });
        }
    });
});

// update todo
router.put('/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                status: 'inactive',
            },
        },
        {
            useFindAndModify: false,
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: 'there is server side error',
                });
            } else {
                res.status(200).json({
                    success: 'Data inserted successfully',
                });
            }
        },
    );
});

// delete todo
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: 'there is server side error',
            });
        } else {
            res.status(200).json({
                message: 'deleted',
            });
        }
    });
});

module.exports = router;
