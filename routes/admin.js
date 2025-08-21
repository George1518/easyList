const express = require('express')
const router = express.Router();
const User = require('../models/users')

router.get('/', async (req,res) =>
{
    const userList = await User.find()
    res.json(userList)
})


module.exports = router