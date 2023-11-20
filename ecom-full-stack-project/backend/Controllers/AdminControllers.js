const ProductSchema = require('../Schemas/Products')
const BannerSchema =  require('../Schemas/Banners')
const pdata = require('../Test-Data/Dummy-Data-Products')
const imageHost = require('../Config/ImageUrl')
var jwt = require('jsonwebtoken');



const fs  = require('fs')










exports.addProduct=  (req,res) =>{
let file_url  = imageHost.imageHost +   req.files[0].filename

const { name , price , discount , category , description } = req.body


ProductSchema.insertMany({name : name , price : price , discount : discount , image : file_url , category : category , description : description}).then((r1)=>{


    if(r1.length > 0)
    {


        res.status(200).send({status : 200 , message : 'Product Added Successfully :)'})

    }
    else
    {
        res.status(500).send({status : 500 , message : 'Something Went Wrong || Please Try Again '})

    }



}).catch((err)=>{
    res.status(500).send({status : 500 , message : 'Something Went Wrong || Please Try Again '})
})

    
}



exports.addBanner  = (req,res) =>{

    const {banner_img} = req.body

    BannerSchema.insertMany({banner_image  : banner_img}).then((result)=>{
        if(result.length >0)
        {
            res.status(200).send({status : 200 , message : 'Banner Added Successfully :)'})

        }
        else
        {
            res.status(500).send({status : 500 , message : 'Something Went Wrong || Please Try Again '})

        }
    }).catch((err)=>{
        res.status(500).send({status : 500 , message : 'Something Went Wrong || Please Try Again '})
    })

}

exports.getBanner =  (req,res)=>{
    BannerSchema.find({active : true}).then((result)=>{
        res.status(200).send({status : 200 , data : result})
    }).catch((err)=>{
        res.status(500).send({status : 500 , message : 'Something Went Wrong || Please Try Again '})
    })
}


exports.getAllProducts = (req,res)=>{

    const { page_no  ,  data_length  } = req.query;

    ProductSchema.find({}).limit(Number(data_length)).skip(Number(page_no) *  Number(data_length)).then(async(result)=>{
        let total_count  = await ProductSchema.count({})
        res.status(200).send({status : 200 , data : result , pagination : {page_no  : Number(page_no) , data_length : Number(data_length) , total :Number(total_count) }})
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status : 500 , message : 'Something Went Wrong || Please Try Again '})
    })


}


exports.deleteProduct =(req,res)=>{
    const {p_id} = req.body

    ProductSchema.deleteOne({_id : p_id}).then((result)=>{
        if(result.deletedCount ==1)
        {
            res.status(200).send({status : 200 , message : "Product Removed Successfully"})

        }
        else
        {
            res.status(400).send({status : 400 , message : "Unable to Removed Product Please Try again"})

        }
    }).catch((err)=>{
        res.status(500).send({status : 500 , message : 'Something Went Wrong || Please Try Again '})

    })


}

exports.editProduct = (req,res)=>{
    var file_url = ""
    var is_delete_file = false
    console.log("122",req.files)
    console.log("123",req.files.length)
if(req.files.length !== 0)
{
    file_url = imageHost.imageHost +   req.files[0].filename
    is_delete_file = true

}
else
{
    file_url  = req.body.pre_path
}
    console.log("116",file_url)

    const {p_id , name , price , discount , category ,  description , pre_path} = req.body

    console.log("120 " , req.body)


    ProductSchema.updateOne({_id: p_id} , {$set : {
        name : name,
        price: price,
        discount : discount ,
        description : description , 
        category  : category , 
        image : file_url,
    }}).then((result)=>{
        console.log(result)
        if(result.modifiedCount == 1)
        {

            if(is_delete_file == true)
            {
                // try {
                //     let f_sp   = req.body.pre_path.split('/');
                //     let f_name  =  f_sp[f_sp.length  - 1]
                //     await fs.unlink('../images/'+ f_name);
                //     console.log(`successfully deleted ${'../images/'+ f_name}`);
                //     res.status(200).send({status : 200 , message : "Product Updated Successfully"})
                // } catch (error) {
                //     console.error('there was an error:', error.message);
                //     res.status(200).send({status : 200 , message : "Product Updated Successfully"})
                //   }
                let f_sp   = req.body.pre_path.split('/');
                    let f_name  =  f_sp[f_sp.length  - 1]
                fs.unlink( '../Backend/images/'+ f_name, (err) => {
                    if (err) {
                      console.error("An error occurred while removing the file:", err);
            res.status(200).send({status : 200 , message : "Product Updated Successfully"})

                    } else {
                      console.log("File successfully removed");
                        res.status(200).send({status : 200 , message : "Product Updated Successfully"})

                    }
                  });
            }
            else
            {

                res.status(200).send({status : 200 , message : "Product Updated Successfully"})

            }


        }
        else
        {
            res.status(400).send({status : 400 , message : "Product Not Updated || Try again"})

        }
    }).catch((err)=>{

        console.log(err)

        res.status(500).send({status : 500 , message : 'Something Went Wrong || Please Try Again '})

    })


}



exports.SearchProducts = (req,res)=>{

    const { page_no  ,  data_length  , q } = req.query;

    ProductSchema.find({
        $or: [
          { name: { $regex: new RegExp(q, "i") } },
          { category: { $regex: new RegExp(q, "i") } },
          { price: { $regex: new RegExp(q, "i") } },
          { discount: { $regex: new RegExp(q, "i") } },
          { description: { $regex: new RegExp(q, "i") } }
        ]}).limit(Number(data_length)).skip(Number(page_no) *  Number(data_length)).then(async(result)=>{
        let total_count  = await ProductSchema.count({})
        res.status(200).send({status : 200 , data : result , pagination : {page_no  : Number(page_no) , data_length : Number(data_length) , total :Number(total_count) }})
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status : 500 , message : 'Something Went Wrong || Please Try Again '})
    })




}






exports.addDummyProducts = (req,res)=>{
  
    

        let temp  = pdata.products
        var count = 0
  

                
for(let i = 0 ; i < temp.length ; i++)
{
    ProductSchema.insertMany({name : temp[i].title , description : temp[i].description , price: temp[i].price , discount :  parseInt(temp[i].discountPercentage) , image : temp[i].thumbnail , category :  temp[i].category},{ maxTimeMS: 20000 }).then((r4)=>{
        if(r4.length > 0)
        {
            count = count +1
            console.log(`${i+1} Product Inserted`)
        }
        else
        {

            console.log(`${i+1} Product Not Inserted`)

        }
     }).catch((err)=>{
       console.log(err)
    })


}

res.send(`${count } Products Inserted`)

      
   

}




exports.checkNumber = (req,res ,next)=>{

    const {number} = req.body

    if(number % 2 ==  0)
    {
        req.query['status'] =  true
        next()
    }
    else
    {
        req.query['status'] =  false
        next()

        // res.status(400).send({message : "Sorry"})
    }

}

exports.showResult  = (req,res) =>{
    console.log(req.files)
    console.log(imageHost.imageHost + req.files[0].filename)
    console.log(req.body.email)

    res.status(200).send("Uploaded")

    


}

const privateKey  = '$%2023#node$%'

exports.tryJwt  =  (req,res)=>{

   let token  =   jwt.sign({mobile :  req.body.mobile}, privateKey , {expiresIn  :"20s"})


   res.send(token)


}

exports.verifyJwt  =  (req,res)=>{
    jwt.verify(req.body.token, privateKey, function(err, decoded) {
        if(err){
            console.log(err)
            res.send(err.message)
        }
        else
        {

            console.log(decoded) // bar
            res.send(decoded)
        }
      });
}