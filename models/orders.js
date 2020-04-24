const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ordersSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'USERS'
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref: 'PRODUCTS'
    },
    createdOn:{
        type : Date,
        default : Date.now()
    }
})

const ORDERS = mongoose.model('ORDERS',ordersSchema)

module.exports = ORDERS