const mongoose  = require('mongoose');


const OtpSchema   = new mongoose.Schema({

    email  : {
        type  : String,
        required  : true,
        unique : true
    },
   otp : {
        type : String,
        required  :true
    },
    time :{
        type : Number,
        required  : true,
    }




})

const Otp_Schema  = mongoose.model('otp', OtpSchema)

module.exports  = Otp_Schema