const mongoose  = require('mongoose');


const ProductSchema   = new mongoose.Schema({

    name   :{
        type :  String,
        required :  true
    },
    price  : {
        type  : String,
        required  : true,
    },
    discount : {
        type : String,
        default : 0,
        required  :true
    },
    category :{
        type : String,
        required  : true,
    },
    image: {
        type  : String,
        required  :true
    },
    description :{
        type  : String,
        required  :true

    }




})

const Product  = mongoose.model('products', ProductSchema)

module.exports  = Product