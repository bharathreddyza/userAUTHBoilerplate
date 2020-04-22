const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:["username is required"]
    },
    email:{
        type:String,
        required:["email is required"]
    },
    password:{
        type:String,
        required:["password is required"]
    }
})

const USERS = mongoose.model('USERS',userSchema)


// creating user using static method 
const createUser = function(newUser,callBack){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password,salt,function(err,hash){
            newUser.password = hash
            newUser.save(callBack)
        })
    })
}

//check with email
const getUserByEmail = function(email,callBack){
    USERS.findOne({email:email},callBack)
}



// to compare the passowrds 
const comparePassword = function(enteredPassword,hash,callBack){
    bcrypt.compare(enteredPassword,hash,function(err,isEqual){
        if(err) throw err;
        callBack(null,isEqual)
    })
}

module.exports = {
    USERS,
    createUser,
    getUserByEmail,
    comparePassword
}