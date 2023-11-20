const mongoose  = require('mongoose');


const BannerSchema   = new mongoose.Schema({

    banner_image   :{
        type :  String,
        required :  true
    },  
    active : {
        type  : String,
        required : true,
        default : true
    }




})

const Banner  = mongoose.model('banners', BannerSchema)

module.exports  = Banner