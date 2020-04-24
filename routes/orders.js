const express = require('express')
const router = express.Router()
const db = require('../models')

// Get = get all orders 

router.get('/',(req,res)=>{
    db.ORDERS.find().populate(['userId','productid'],)
    .then((data)=>res.render('orders',{data:data}))
    .catch((err)=>res.send(err))
})

// POST - create a new order 
router.post('/',(req,res)=>{
    db.ORDERS.create(req.body)
    .then((data)=>res.json(data))
    .catch((err)=>res.json(err))
})

module.exports = router