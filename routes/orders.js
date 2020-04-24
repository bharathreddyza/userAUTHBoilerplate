const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn  =require('../middleware/index')

// Get = get all orders 

router.get('/',isLoggedIn,(req,res)=>{
    db.ORDERS.find().populate(['userId','productid'])
    .then((data)=>res.render('orders',{data:data},console.log("data",data)))
    .catch((err)=>res.send(err))
})

// POST - create a new order 
router.post('/',(req,res)=>{
    db.ORDERS.create(req.body)
    .then((data)=>res.json(data))
    .catch((err)=>res.json(err))
})

module.exports = router