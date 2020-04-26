var express = require('express');
var router = express.Router();
const db = require('../models')
const nodemailer = require('nodemailer')
const passport = require('passport')


const transporter = nodemailer.createTransport({
  pool : true,
  service : "Gmail",
  secure : false,
  auth : {

    user : "bharathreddyza@gmail.com",
    pass : "back3654/"
  },
  tls : {
    rejectUnauthorized : false
  }
})


// http method GET 
// res send  a register page 

router.get('/', function(req, res, next) {
  res.render('register');
});



// save to the database on signing up 
//path -> /register

router.post('/',(req,res)=>{
  const newUser = new db.USERS.USERS({
    userName : req.body.userName,
    email : req.body.email,
    password : req.body.password
  })

  db.USERS.createUser(newUser, async function(err,user){
    if(err){
       console.log(err)

  } else{
    // we create the mail
    const mail = {
      from : "bharath<bharathreddyza@gmail.com>",
      to :  user.email, //list of receivers,
      subject : "Thank you for registering with us",
      html : `<p> Hi ${user.userName},</p> 
        <p>Thank you for checking out my blog </p> 
        <p>lets connect </p>
        <p> <a href="https://www.linkedin.com/in/bharathreddy2/">Linkdin</a>  </p>
        <p> <a href="https://twitter.com/BharathZa">Twitter</a>  </p>

      `
    } 
     
    // create the transporter object 
    await transporter.sendMail(mail,function(err,info){
      if(err) console.log(err)
      console.log(info)
    
      res.render('login')
    })
  }
  })
})



module.exports = router;