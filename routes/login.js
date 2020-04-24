var express = require('express');
var router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')
// localStrategy = require('passport-local')

router.get('/',(req,res)=>{
    res.render('login')
})

router.post('/', passport.authenticate('local',{
failureRedirect: '/login' } ),(req,res)=>{
    console.log(req.user)
    
    res.redirect('/')
} )


// router.post('/',(req,res)=>{
//     console.log(req.body)
//   db.USERS.USERS.findOne({email:req.body.email})
//   .then((data)=>{
//       console.log(data)
//       if(!data){
//          res.redirect('login')
//       }
//       else{
//         bcrypt.compare(req.body.password,data.password,(err,result)=>{
//             if(err){ console.log("incorect password")}
//             else if(!result){
//             res.redirect('login')                
//             }
//             else{
//                 res.redirect('home')
//             }
//         })
//       }
//   })
//   .catch((err)=>console.log(err))
// })

module.exports = router