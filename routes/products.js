const express = require('express')
const router = express.Router()
const isLoggedIn  =require('../middleware/index')
const db = require('../models')

router.get('/',(req,res)=>{
    db.PRODUCTS.find()
    .then((data)=>res.render('products',{data:data}))
    .catch((err)=>res.json(err))
})


router.post('/' , (req,res)=>{
    console.log(req.body)
    db.PRODUCTS.create(req.body)
    .then((data)=> res.json(data))
    .catch((err)=> res.send(err))
})


module.exports = router