var express = require('express');
var router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')
 
router.get('/',(req,res)=>{
    res.render('login')
})

router.post('/', passport.authenticate('local',{successRedirect:'/products',
failureRedirect: '/login' } ),(req,res)=>{
    console.log(req.user)
    
    res.redirect('/products')
} )




module.exports = router