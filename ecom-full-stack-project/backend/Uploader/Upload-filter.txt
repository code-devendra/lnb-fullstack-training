const express = require('express')
const multer  = require('multer')


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
        console.log(file)
        console.log(req.query)
      cb(null, Number(new Date(Date.now())).toString() + file.originalname   )
    }
  })


  
const upload = multer({
    storage: multerStorage,
    fileFilter: function (req, file, callback) {
      // console.log("yaha 67")
      
  
      // if(!req.files)
      // {
      //     return res.status(400).send({status : 400 , message  :"Please Upload At Least one Product Image"})
      // }


   
      let temp  =   file.originalname.split('.') 
      var ext = "."+temp[temp.length  - 1] ;
      console.log(temp)
      console.log(ext)

      if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg'&& ext !== '.HEIC' && ext !== '.JPG' && ext !== '.PNG' && ext !== '.JPEG') {
          return callback(new Error('Only images are allowed'))
      }
    	
      callback(null, true)
    
  }
  
  
  });
  
  const uploadFiles = upload.array('img' , 1)


  exports.uploadImages = (req, res, next) => {
   

    // if(!req.files)
    // {
    //     return res.status(400).send({status : 400 , message  :"Please Upload At Least one Product Image"})
    // }
      uploadFiles(req, res, err => {

        console.log("*******************************")
        console.log(req.body);
        console.log(req.files);
        
        console.log("*******************************")

 
    


        if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
          if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
            
          }
        } else if (err) {
            console.log(err.message)
        return   res.status(400).send({status : 400 , message : err.message})     
        }

    console.log("78",req.path)
        

    if(req.files.length == 0 && req.path == '/add-product')
    {
        return res.status(400).send({status : 400 , message  :"Please Upload At Least one Product Image"})
    }

        next()
        
    
      });
    };

