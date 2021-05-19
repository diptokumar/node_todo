const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const checkLogin = require('../middlewares/checklogin');

const router = express.Router();
// eslint-disable-next-line new-cap
const Todo = new mongoose.model('Todo', todoSchema);

// get all todo using try block and async await
router.get('/',checkLogin ,async (req, res) => {
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

// get active todo
router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
        data,
    });
});
// get inactive todo
router.get('/inactive', (req, res) => {
    const todo = new Todo();
    todo.findinActive((err, data) => {
        res.status(200).json({ data });
    });
});
// get static todo
router.get('/potato', async (req, res) => {
    const data = await Todo.findpotato();
    res.status(200).json({ data });
});
// get query
router.get('/language/:id', async (req, res) => {
    const data = await Todo.find().findLang(req.params.id);
    res.status(200).json({ data });
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
router.post('/', (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.save((err) => {
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

router.post('/all', (req, res) => {
    Todo.insertMany(req.body, (err) => {
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
router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(
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
            // eslint-disable-next-line comma-dangle
        }
    );
});

// delete todo
router.delete('/:id', (req, res) => {
    Todo.deleteOne({ _id: req.params.id }, (err) => {
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
