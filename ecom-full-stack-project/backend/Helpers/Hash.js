const bcrypt = require('bcrypt');

const hashPassword = async (password , res , Role) => {
    try {
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      if(Role == "Admin")
      {
        console.log({status : 500 , message :"Something Went Wrong || Please Try Again"})
      }
      else
      {

        res.status(500).send({status : 500 , message :"Something Went Wrong || Please Try Again"})
      }

    }
  };



const sendMail = (email ,name , res) =>{

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


module.exports =  {hashPassword ,  sendMail}


