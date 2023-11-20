const UserSchema = require('../Schemas/UserSchema')
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
const {hashPassword} = require('../Helpers/Hash');
const Otp_Schema = require('../Schemas/OtpSchema');
const ProductSchema = require('../Schemas/Products')
const CartSchema  = require('../Schemas/Cart')
const AddressSchema  = require('../Schemas/Address')
const OrdersSchema = require('../Schemas/OrdersSchema')
const moment = require('moment')
const Razorpay = require("razorpay");
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


  const PaymentSchema  = require('../Schemas/PaymentSchema')
  


 const  RAZORPAY_SECRET="sz6b3DlxUlxJQgxwzT5H4YZD";
const RAZORPAY_KEY_ID='rzp_test_EzVF445P5NSPLb'


exports.do_payment  = async  (req,res , next)=>{

    try {
        const instance = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_SECRET,
        });

        const options = {
            amount: req.body.total_price   * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        console.log("Order" , order)

        if (!order) return res.status(500).send("Some error occured");
        // console.log("body",req.body)
        // console.log(order)
        // console.log(typeof order)
        
        res.json({...order , ['mongo_order_id']  : req.body.order_id});
    } catch (error) {
        console.log("Error" , error)
        res.status(500).send({status : 500 , message : error.error.description });
    }

}


exports.process_payemnt = (req,res) =>{
    // console.log('Order_Generate_id' , req.body.order_id)    
    console.log("rp_order_details" , req.body.rp_order_details.data)
    console.log("rp_payment_details" , req.body.rp_payment_details)

    // res.status(200).send({status : 200 , message  :"Payment done"})

    const {mongo_order_id , amount , created_at}  = req.body.rp_order_details.data;
    const {razorpay_payment_id ,razorpay_order_id  ,razorpay_signature} = req.body.rp_payment_details

    PaymentSchema.insertMany({

        order_id  : mongo_order_id,
        order_amount  : amount / 100,
        txn__payment_id : razorpay_payment_id,
        txn__order_id : razorpay_order_id,
        txn_signature : razorpay_signature,
        txn_date : created_at,
         status :  razorpay_payment_id ?  1 :  0


    }).then((result)=>{
        if(result.length > 0){
            res.status(200).send({status : 200 , message : "Pyment Done Sucessfully" , data : {p_id :  razorpay_payment_id}})
        }
        else
        {
            res.status(400).send({status : 400 , message : "Pyment Failed" , data : {p_id :  null}})

        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status: 500 , message : "Something Went  Wrong|| Cannot Initiate Payment"})

    })


}



exports.checkAddress = (req,res)=>{

    const {uid } = req.query;

    AddressSchema.find({u_id : uid}).then((result)=>{
        if(result.length  > 0)
        {
            res.status(200).send({status: 200 , address_chk :  true})

        }else
        {
            res.status(200).send({status: 200 , address_chk :  false})

        }
    }).catch((err)=>{
        res.status(500).send({status: 500 , message : "Something Went  Wrong"})
        })

}

  exports.addAddress = (req,res)=>{
    const {uid , house_no, street ,  landmark ,  country , state , city,
    pincode , lat , long, alter_mobile} = req.body
    AddressSchema.insertMany({u_id  :  uid , 
        house_no  : house_no,
        street : street ,
        landmark  : landmark,
        country : country,
        state :  state ,
        city : city ,
        pincode : pincode,
        lat: lat,
        long : long,
        alter_mobile : alter_mobile }).then((result)=>{
            if(result.length > 0)
            {
                res.status(200).send({status: 200 , message : "Address Added Successfully"})

            }
            else
            {
                res.status(500).send({status: 500 , message : "Something Went  Wrong || Try Again"})

            }
        }).catch((err)=>{
            console.log(err)
        res.status(500).send({status: 500 , message : "Something Went  Wrong"})
        })
  }


  exports.getallAddress = (req,res)=>{
    const {uid } = req.query

    AddressSchema.find({u_id : uid}).then((result)=>{
        res.status(200).send({status: 200 , data: result})
    }).catch((err)=>{
        console.log(err)
    res.status(500).send({status: 500 , message : "Something Went  Wrong"})
    })

  }


exports.ShowResult = (req,res)=>{
    if(req.body.num  % 2  == 0)
    {
        res.send(`<h1  style='color:green' >${req.body.num} is Even Number:)<h1>`)

    }
    else{
        res.send(`<h1  style='color:red' >${req.body.num} is Odd Number  ):<h1>`)

    }
}


exports.GetAllProduct = (req,res)=>{

    ProductSchema.find({}).then((result)=>{
        
        res.status(200).send({status : 200 , data : result})

    }).catch((err)=>{
        res.status(500).send({status: 500 , message : "Something Went  Wrong"})
    })

}

exports.addToCart = (req,res) =>{

    const {u_id , p_id }  = req.body

    CartSchema.insertMany({u_id : u_id  , p_id : p_id , time : Number(new Date(Date.now()))  , quantity  :1 }).then((result)=>{
        if(result.length > 0 )
        {

            res.status(200).send({status: 300 , message : "Product Added into Cart Successfully"})

        }else
        {
            res.status(400).send({status: 300 , message : "Something Went  Wrong || Try Again"})

        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status: 500 , message : "Something Went  Wrong  || Try Again" })
    })


}

exports.getCartItems = (req,res)=>{
    const {uid} = req.query
    CartSchema.find({u_id :  uid}).then((r1)=>{
        res.status(200).send({status: 300 ,data : r1 , count : r1.length})

    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status: 500 , message : "Something Went  Wrong  || Try Again" })
    })
}


exports.getDtailedCart  =  async (req,res)=>{

    const {uid} = req.query
    CartSchema.find({u_id :  uid}).then(async (r1)=>{

        for(let i =  0 ; i < r1.length ; i++)
        {
            var pd = await ProductSchema.findOne({_id : r1[i].p_id})
            r1[i]._doc['p_data'] =  pd
        }
      

        res.status(200).send({status: 300 ,data : r1 , count : r1.length})

    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status: 500 , message : "Something Went  Wrong  || Try Again" })
    })
    
}

exports.handleQauantity  = (req,res)=>{
    const {cid , quantity }= req.body

    if(quantity != 0)
    {

    

    CartSchema.updateOne({_id : cid} , {$set:{quantity : quantity}}).then((result)=>{
        if(result.modifiedCount == 1)
        {
            res.status(200).send({status: 200 , message : "Quantity Updated" })

        }
        else
        {
            res.status(400).send({status: 400 , message : "Quantity Not Updated" })

        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status: 500 , message : "Something Went  Wrong  || Try Again" })
    })
}else
{
    CartSchema.deleteOne({_id : cid}).then((result)=>{
        if(result.deletedCount == 1)
        {
            res.status(200).send({status: 200 , message : "Product Removed" })

        }
        else
        {
            res.status(400).send({status: 400 , message : "Product Not Removed" })

        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status: 500 , message : "Something Went  Wrong  || Try Again" })
    })
}
    

}






exports.Verify_otp = async (req,res)=>{
    const {email , otp , password} =  req.body;
    let hash  = await hashPassword(password , res)


    UserSchema.find({email : email}).then((r1)=>{

        if(r1.length > 0)
        {

            Otp_Schema.find({email : email}).then((r2)=>{

                if(r1.length > 0)
                {

                    if(otp == r2[0].otp)
                    {


                        let ct = Number(new Date())
                        let ot = parseInt(r2[0].time)
                        if(((ct - ot) / 1000) > 30  )
                        {
                            res.status(401).send({status : 401 , message :"OTP Has expired || Please Generae a New OTP"})

                        }
                        else
                        {


                            UserSchema.updateOne({email : email} , {$set :{password  : hash}}).then((r4)=>{
                                if(r4.modifiedCount ==1 )
                                {
                                    transporter.sendMail({
                                        from: '"NODE-JS 👻" <alwaysreadygit@gmail.com>', // sender address
                                        to: email, // list of receivers
                                        subject: "RESETED OTP", // Subject line
                                        text: "Hello " +r1[0].name, // plain text body
                                        html: `<h3>Hi ${r1[0].name}  , Your PAssword has Reseted Just Now at : ${new Date(Date.now())}  </h3>`, // html body
                                      }).then((info)=>{
                                        if(info.messageId)
                                        {
                                            res.status(200).send({status : 200 , message :"Password Reset Successfully"})
                            
                                        }
                                        else
                                        {
                                            res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                            
                                        }
                                      }).catch((err)=>{
                                        res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                            
                                      })   
                                }
                                else
                                {
                                    res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})

                                }
                            }).catch((err)=>{
                                    res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                            
                                })
        


                                

                        }


                    }
                    else
                    {
                        res.status(400).send({status : 400 , message :"Incorrect OTP"})

                    }

                }  
                else
                {
                    res.status(500).send({status : 500 , message :"Something Went Wrong || Please Resend OTP"})

                }
                
            }).catch((err)=>{
                res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
        
            })
        

        }
        else
        {
            res.status(400).send({status : 300 , message :"We could not find any account with this mail"})

        }

    }).catch((err)=>{
        res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})

    })







}  




exports.Send_OTP = (req,res)=>{

    const {email} = req.body
    let otp = Math.floor(Math.random() *  678957).toString().padStart(6 , '0')

    UserSchema.find({email : email}).then((r1)=>{

        if(r1.length > 0)
        {


            Otp_Schema.find({email : email}).then((r2)=>{
                if(r2.length > 0)
                {

                        Otp_Schema.updateOne({email :email} , {$set : {otp : otp , time : Number(new Date())  }}).then((r3)=>{

                            if(r3.modifiedCount == 1)
                            {
                                transporter.sendMail({
                                    from: '"NODE-JS 👻" <alwaysreadygit@gmail.com>', // sender address
                                    to: email, // list of receivers
                                    subject: "RESET OTP", // Subject line
                                    text: "Hello " +r1[0].name, // plain text body
                                    html: `<h3>Hi ${r1[0].name}  , Your 6 digit OTP to Reset your Password is : ${otp}  </h3>`, // html body
                                  }).then((info)=>{
                                    if(info.messageId)
                                    {
                                        res.status(200).send({status : 200 , message :"OPT Sent on your mail Successfully"})
                        
                                    }
                                    else
                                    {
                                        res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                        
                                    }
                                  }).catch((err)=>{
                                    res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                        
                                  })   
                            }
                            else
                            {
                                res.status(500).send({status : 500 , message :"Didn't Generate OTP || Please Try Again"})

                            }

                        }).catch((err)=>{
                             res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
        
            })

                }
                else
                {

                    Otp_Schema.insertMany({email: email , otp :otp , time : Number(new Date()) }).then((r4)=>{

                            if(r4.length > 0)
                            {

                                transporter.sendMail({
                                    from: '"NODE-JS 👻" <alwaysreadygit@gmail.com>', // sender address
                                    to: email, // list of receivers
                                    subject: "NODE JS Login", // Subject line
                                    text: "Hello " + r1[0].name, // plain text body
                                    html: `<h3>Hi ${r1[0].name}  , Your 6 digit OTP to Reset your Password is : ${otp}  </h3>`, // html body
                                  }).then((info)=>{
                                    if(info.messageId)
                                    {
                                        res.status(200).send({status : 200 , message :"OPT Sent on your mail Successfully"})
                        
                                    }
                                    else
                                    {
                                        res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                        
                                    }
                                  }).catch((err)=>{
                                    res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                        
                                  })
                        

                            }
                            else
                            {
                                res.status(500).send({status : 500 , message :"Didn't Generate OTP || Please Try Again"})

                            }

                    }).catch((err)=>{
                             res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
        
            })


                }
            }).catch((err)=>{
                res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
        
            })

        }
        else
        {
            res.status(400).send({status : 300 , message :"We could not find any account with this mail"})

        }

    }).catch((err)=>{
        res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})

    })



}




exports.login= (req,res) =>{

    const {email , password}  = req.body

UserSchema.find({email : email}).then((r1)=>{

    if(r1.length > 0)
    {


        bcrypt.compare(password ,  r1[0].password  , function(err, status){

            if(err)
            {    
                res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
            }
            else
            {
                if(status == true)
                {
                    console.log(r1[0])

                    const {name , email , mobile , address , _id , role} = r1[0]

                    transporter.sendMail({
                        from: '"NODE-JS 👻" <alwaysreadygit@gmail.com>', // sender address
                        to: email, // list of receivers
                        subject: "NODE JS Login", // Subject line
                        text: "Hello " + name, // plain text body
                        html: `<h3>Hi ${name}  You have recently Logged in at ${new Date(Date.now())}</h3>`, // html body
                      }).then((info)=>{
                        if(info.messageId)
                        {
                            res.status(200).send({status : 200 , message :"Login Successfully ||" ,  data : {name : name , email : email , mobile : mobile , address: address  , _id : _id , role :  role}})
            
                        }
                        else
                        {
                            res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
            
                        }
                      }).catch((err)=>{
                        res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
            
                      })
            
                

                }
                else
                {
                    res.status(400).send({status : 400 , message :"Incorrect Password ||"})

                }
            }

        })

    }
    else
    {
        res.status(400).send({status : 400 , message :"You are not a registered user ||"})

    }

}).catch((err)=>{

    res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})

    
})

}

exports.AddUser =  async (req,res)=>{
const {name , email ,  mobile , password ,  address} = req.body

                let hash  = await hashPassword(password , res)
                console.log(hash)

        
                UserSchema.insertMany({name : name , mobile :mobile , email :  email , password : hash ,address : address , role : "Customer" }).then((result)=>{

                    if(result.length > 0)
                    {
                        transporter.sendMail({
                            from: '"NODE-JS 👻" <alwaysreadygit@gmail.com>', // sender address
                            to: email, // list of receivers
                            subject: "NODE JS Registration", // Subject line
                            text: "Hello " + name, // plain text body
                            html: `<h3>Hi ${name}  Your Registration has successfully Done at ${new Date(Date.now())}</h3>`, // html body
                          }).then((info)=>{
                            if(info.messageId)
                            {
                                res.status(200).send({status : 200 , message :"User created Successfully"})
                
                            }
                            else
                            {
                                res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                
                            }
                          }).catch((err)=>{
                            res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                
                          })
                        
                
                
                    }
                    else
                    {
                        res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                
                    }
                
                }).catch((err)=>{
                    if(err.name =='ValidationError' )
                    {
                
                        res.status(400).send({status : 400 , message : `${err.message.split(':')[1].toUpperCase()} is Required`})
                
                    }
                    else if(err.name == 'MongoBulkWriteError'){
                
                        res.status(400).send({status : 400 , message : `User Already exits with this data : {  ${err.message.split(':')[3].replace('{' , "").trim().toUpperCase()}  : ${err.message.split(':')[4].replace('}' , "").trim().toUpperCase()}  }`})
                
                    }
                    else
                    {
                        res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
                
                    }
                })
            
        
 






}

const formatDate = (d)=>{
    let od =  new Date(Number(d))
    console.log(od)
    let md  =  moment(od).format('MMMM Do YYYY, h:mm:ss a');
    console.log(md)
    return md

}


function createOrderTemplate(data){


    let base_1 =  `
    <html>
    <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

    </head>
    <body>`
    let base_2 = ` </body>
    </html>`

    let loop_str  =  ""


    // for(let  i = 0  ; i < data.p_data.length ; i++)
    // {
        
    // }

 

    let main_base = `
    <div class="card" style="width: 100%">

<div class="container" style="margin : 10">
  <div class="row">
    <div class="col-sm">
      <h6>Order Date</h6>
      <h6>${formatDate(data.order_date)}</h6>
    </div>
    <div class="col-sm">
      <h6>Shipping Address</h6>
      
      <h6>{el.delivery_address.house_no},{el.delivery_address.street},{el.delivery_address.landmark},{el.delivery_address.pincode},{el.delivery_address.city},{el.delivery_address.state} </h6>
    </div>
    <div class="col-sm">
        <h6>Total Price of Orders</h6>
        <h6>${data.total_price}</h6>
     
    </div>
    <div class="col-sm">
      <h6>Order Tracking Number</h6>
      <h6>${data._id}</h6>
    </div>
  </div>
</div>


  <div class="card-body">
    <h5 class="card-title">Product Details</h5>
    <p class="card-text">

    <div class="container">
        {el.order_data.map((ol ,j)=>(
            <>
  <div class="row">
  <div class="col-sm">
      <img class="card-img-top" src={ol.p_data.image} style="width : 100px;height  :100px; margin : 10" alt="Card image cap" />

  </div>
  <div class="col-sm">
    <h4>MRP :  {ol.p_data.price}</h4>
    <h4>Product Discount :  {ol.p_data.discount}</h4>
    <h4>Price :  {ol.p_data.discount }</h4>
  </div>
</div>


<hr></hr>
            </>
        ))}

</div>
    </p>
  </div>
</div>
<hr />

</>
</div>
    `

return base_1 + main_base  +base_2
    
}



exports.purchaseOrder  = (req,res ,  next)=>{

   const  {uid, order_data , total_price , address_id , name , email } = req.body
   let order_date   = Number(new Date(Date.now()))
   let order_number =  Math.floor(Math.random() *  43567898976).toString().padEnd('8', "0");
   let status =  0


   
   OrdersSchema.insertMany({
    uid: uid, total_price  : total_price , address_id :  address_id,order_data :  order_data,
    order_date : order_date , order_number  :order_number , status : status ,  payment_mode  : 'cash'
   }).then((result)=>{
    if(result.length > 0)
    {
        console.log(result)

        let new_temp  =  createOrderTemplate(result[0])

        CartSchema.deleteMany({u_id :  uid}).then((res2)=>{
            if(res2.deletedCount != 0)
            {
                req.body['order_id'] = result[0]._id
                next()

                // transporter.sendMail({
                //     from: '"NODE-JS 👻" <alwaysreadygit@gmail.com>', // sender address
                //     to: email, // list of receivers
                //     subject: "Order Placed", // Subject line
                //     text: "Hello " + name, // plain text body
                //     html: `<h3>Hi ${name}  Your Order has successfully Done at ${new Date(Date.now())} With order Number : ${order_number}</h3>
                //         ${new_temp}
                //     `, // html body
                //   }).then((info)=>{
                //     if(info.messageId)
                //     {
                        // res.status(200).send({status : 200 , message :"Order created Successfully"})

        
                //     }
                //     else
                //     {
                //         res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
        
                //     }
                //   }).catch((err)=>{
                //     res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
        
                //   })

            }
            else
            {
                res.status(400).send({status : 400 , message :"Something Went Wrong"})

            }
        }).catch((err)=>{
            console.log(err)
            res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
        
           })


    }
    else
    {
        res.status(400).send({status : 400 , message :"Something Went Wrong"})

    }
   }).catch((err)=>{
    console.log(err)
    res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})

   })
  

}


exports.getAllOrders = (req,res)=>{
    const {uid} = req.query

    OrdersSchema.find({uid: uid}).then( async(result)=>{
        temp = [...result]

        if(result.length > 0){

            for(let i   = 0 ; i <  result.length  ; i++)
            {
                let addr =  await AddressSchema.findOne({_id  : result[i].address_id })
                temp[i]._doc['delivery_address'] =  addr
                // r1[i]._doc['p_data'] =  pd
            }

            res.status(200).send({status : 200 , data : temp})
        }
        else
        {
            
            res.status(200).send({status : 200 , data : []})
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
    
       })
      

}


exports.getPaymentDetailsByOrderId =  (req,res) =>{

        const {id} = req.body


        PaymentSchema.find({order_id : id }).then((result)=>{
            res.status(200).send({status : 200 , data : result})
        }).catch((err)=>{
            console.log(err)
            res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
        
           })


}


exports.getMyProfile = () =>{


    

}