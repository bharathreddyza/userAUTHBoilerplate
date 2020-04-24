const mongoose = require('mongoose');
const Schema = mongoose.Schema
const productSchema = new Schema({
    productName : {
        type : String
    },
    price : {
        type : Number
    },
    createdOn:{
        type : Date,
        default : Date.now()
    }
})

const PRODUCTS = mongoose.model('PRODUCTS',productSchema)

module.exports = PRODUCTS;