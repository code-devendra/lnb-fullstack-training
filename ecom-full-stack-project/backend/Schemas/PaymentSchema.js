const mongoose  = require('mongoose');


const PaymentSchema   = new mongoose.Schema({

    order_id : {
        type :  String,
        required :  true
    },
    order_amount  : {
        type  : Number,
        required  : true,
    },
    txn__payment_id: {
        type : String,
        required  :true
    },
    txn__order_id:{
        type : String,
        required  : true,
    },
    txn_signature: {
        type  :String,
        required  :true
    },
    txn_date : {
        type :Number,
        required  :true
    },
    // payment_mode:{
    //     type : String,
    //     required : true
    // },
    status :{
        type  : Number,
        required  :true,
        enum : [0,1,2]
        // 0 Pending
        // 1 Sucess
        // 2 Failed

    }




})

const Payment = mongoose.model('payments', PaymentSchema)

module.exports  = Payment