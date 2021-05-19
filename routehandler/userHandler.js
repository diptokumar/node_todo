const express = require('express');
const mongoose = require('mongoose');

const userSchema = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
// eslint-disable-next-line new-cap
const User = new mongoose.model('User', userSchema);

//signup router
router.post('/signup', async (req, res) => {
    try{
        const hashpassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await new User({
        name: req.body.name,
        userName: req.body.userName,
        password: hashpassword,
    });
    await newUser.save();
    res.status(200).json({ newUser: newUser});
    }catch(e){
        res.status(500).json({ message: 'sign failed' });
    }
});
//login router
router.post('/login', async (req, res)=>{
    const user = await User.find({userName: req.body.userName});

    if (user && user.length > 0) {
        const isValid = await bcrypt.compare(req.body.password, user[0].password);
        if (isValid) {
            const token = jwt.sign({ userName: user[0].name, userId: user[0]._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({
                token: token,
                message: 'Authentication SuccessFull'
            });
        }else{
            res.status(401).json({
                message: 'Authentication failed'
            })
        }
       

        
    }else{
        res.status(401).json({
            message: 'Authentication failed'
        })
    }
})


module.exports = router;