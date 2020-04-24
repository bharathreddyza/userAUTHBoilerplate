const mongoose = require('mongoose');
const Schema = mongoose.Schema
const productSchema = new Schema({
    productName : {
        type : String
    },
    price : {
        type : String
    },
    createdOn:{
        type : Date,
        default : Date.now()
    },
    description:String,
    image:String
})

const PRODUCTS = mongoose.model('PRODUCTS',productSchema)

module.exports = PRODUCTS;