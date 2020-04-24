const express = require('express')
const router = express.Router()
const isLoggedIn  =require('../middleware/index')
const db = require('../models')

router.get('/',(req,res)=>{
    db.PRODUCTS.find()
    .then((data)=>res.render('home',{data:data}))
    .catch((err)=>console.log(err))
})

module.exports = router