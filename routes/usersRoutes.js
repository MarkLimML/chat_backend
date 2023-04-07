const router = require('express').Router();
const User = require('../models/User');

router.post('/', async(req, res) => {
    try {
        const{name, password} = req.body;
        const user = await User.create({name,password});
        res.status(200).json(user);
    } catch (e) {
        if(e.code == 11000) {
            let msg = "User exists";
        }
        else {
            msg = e.message;
        }
        console.log(e);
        res.status(400).json(msg);
    }
})

router.post('/login', async(req, res) => {
    try {
        const{name, password} = req.body;
        const user = await User.findByCredentials(name,password);
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        console.log(e.message);
        res.status(400).json(msg);
    }
})

module.exports = router