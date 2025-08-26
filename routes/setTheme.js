const express = require('express');
const router = express.Router();
const User = require('../models/users')



router.get('/', async (req,res) =>
{
    try
    {
     res.set('Cache-Control','no-store')
    console.log("Session in getTasks:", req.session);
    const userId = req.session.userId; // from session
   console.log(userId)
    const userTheme = await User.findById(userId)
    await res.json(userTheme.theme)
    console.log(userTheme)
    }
    catch
    {
        res.status(500).send("something went wrong probably my code")
    }
    
})

router.put('/', async (req,res) =>
{
    try
    {
     res.set('Cache-Control','no-store')
    console.log("Session in getTasks:", req.session);

    const userId = req.session.userId; // from session
    console.log(req.body.theme)
    const userTheme = await User.findById(userId)
    userTheme.theme = await req.body.theme;
   await userTheme.save();
   console.log('theme setted')
    await res.json(userTheme.theme)
    }
    catch
    {
        res.status(500).send('something went wrong')
    }
   
})

module.exports = router

