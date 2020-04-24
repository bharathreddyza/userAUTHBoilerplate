const express = require('express')
const router = express.Router()
const isLoggedIn  =require('../middleware/index')
 
router.get('/',(req,res)=>{
    res.render("home")
})

module.exports = router