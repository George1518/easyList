const express = require('express');
const router = express.Router()
const path = require('path')
const { console } = require('inspector')
const userRegistration = require('../controllers/auth/userRegistration')


router.post('/',userRegistration)

router.use((req,res) =>
{
    res.sendFile(path.join(__dirname,'../public','login.html'))
    
})

module.exports = router
