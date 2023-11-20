const UserSchema = require('../Schemas/UserSchema')
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
const {hashPassword} = require('../Helpers/Hash');
const Otp_Schema = require('../Schemas/OtpSchema');
const ProductSchema = require('../Schemas/Products')
const CartSchema  = require('../Schemas/Cart')
const AddressSchema  = require('../Schemas/Address')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "alwaysreadygit@gmail.com",
      pass: "eircvkkpaaugwxtl",
    },
  });



const AddAdmin  = async () => {
                    let hash  = await hashPassword("Admin@123", {} , "Admin")
                    console.log(hash)
    
            
                    UserSchema.insertMany({name : 'Admin', mobile : 9090909090 , email :  'alwaysreadygit@gmail.com' , password : hash ,address : "Admin Address" , role : "Admin" }).then((result)=>{
    
                        if(result.length > 0)
                        {
                            transporter.sendMail({
                                from: '"NODE-JS 👻" <alwaysreadygit@gmail.com>', // sender address
                                to: email, // list of receivers
                                subject: "NODE JS Registration", // Subject line
                                text: "Hello " + "Admin", // plain text body
                                html: `<h3>Hi ${'Admin'}  Your Registration has successfully Done at ${new Date(Date.now())}</h3>`, // html body
                              }).then((info)=>{
                                if(info.messageId)
                                {
                                    console.log({status : 200 , message :"Admin created Successfully"})
                    
                                }
                                else
                                {
                                    console.log({status : 500 , message :"Something Went Wrong || Please Try Again"})
                    
                                }
                              }).catch((err)=>{
                                console.log({status : 500 , message :"Something Went Wrong || Please Try Again"})
                    
                              })
                            
                    
                    
                        }
                        else
                        {
                            console.log({status : 500 , message :"Something Went Wrong || Please Try Again"})
                    
                        }
                    
                    }).catch((err)=>{
                        if(err.name =='ValidationError' )
                        {
                    
                            console.log({status : 400 , message : `${err.message.split(':')[1].toUpperCase()} is Required`})
                    
                        }
                        else if(err.name == 'MongoBulkWriteError'){
                    
                            console.log({status : 400 , message : `Admin Already exits with this data : {  ${err.message.split(':')[3].replace('{' , "").trim().toUpperCase()}  : ${err.message.split(':')[4].replace('}' , "").trim().toUpperCase()}  }`})
                    
                        }
                        else
                        {
                            console.log({status : 500 , message :"Something Went Wrong || Please Try Again"})
                    
                        }
                    })
                
            
     
    
    
    
    
    
    
    }


    AddAdmin()