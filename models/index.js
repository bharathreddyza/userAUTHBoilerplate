const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bharath:bharath@cluster0-igog4.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
console.log(`Database is connected`)
}).catch((err)=>{
console.error(err)
})
const USERS = require('./users') //imported from users.js
const PRODUCTS = require('./products')
const ORDERS = require('./orders')
module.exports = {
USERS,
PRODUCTS,
ORDERS
}