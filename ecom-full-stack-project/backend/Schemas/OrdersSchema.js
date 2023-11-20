const mongoose  = require('mongoose');


const OrdersSchema   = new mongoose.Schema({

    order_number   :{
        type :  String,
        required :  true
    },
    uid : {
        
        type :  String,
        required :  true
    },
    order_data  : {
        type  : [],
        required  : true,
    },
    total_price: {
        type : Number,
        required  :true
    },
    address_id:{
        type : String,
        required  : true,
    },
    order_date: {
        type  :String,
        required  :true
    },
    payment_mode:{
        type : String,
        required : true
    },
    status :{
        type  : Number,
        required  :true,
        enum : [0,1,2,3,4,5]
        // 0 Pending
        // 1 Ready
        // 2 Disptched 
        //  3 Deliverd
        //  4 Return
        //  5 Cancelled

    }




})

const Order = mongoose.model('orders', OrdersSchema)

module.exports  = Order