import { useState } from "react"
import { Admin_Base_URL } from "../../Config/BaseURL"
import axios, { Axios } from "axios"
import { toast } from "react-toastify"







function AddProduct(){


    const [values , setValues ] =  useState({
        name  : "",
        price : 0,
        discount  : 0,
        category : "",
        description  :"",
        image  : "",
        temp_img  : ""

    })



    const onInput  = (e) =>{

        setValues({...values , [e.target.name] : e.target.value})

    }

    const handleImage = (e) =>{

        console.log(e.target.files[0])

        setValues({...values , ['image']  :e.target.files[0] ,  ['temp_img']  : URL.createObjectURL(e.target.files[0]) })



    }


    const onSubmit = ()=>{


        let fd =  new FormData()
        fd.append('name' ,  values.name)
        fd.append('price' ,  values.price)
        fd.append('discount' ,  values.discount)
        fd.append('category' ,  values.category)
        fd.append('description' ,  values.description)
        fd.append('img' ,  values.image)


        axios.post(Admin_Base_URL  + '/add-product' ,  fd).then((res)=>{
            toast.success(res.data.message)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })

    }



    return (

        <div className="container">


  <div class="form-group">
    <label for="p1">Product Name</label>
    <input type="text" name="name"  value={values.name} onChange={onInput} class="form-control" id="pa"  placeholder="Enter Product Name" />
  </div>
  <div class="form-group">
    <label for="p2">Price</label>
    <input type="number" name="price"  value={values.price} onChange={onInput} class="form-control" id="p2" placeholder="Enter Price" />
  </div>
  <div class="form-group">
    <label for="p3">Discount</label>
    <input type="number" name="discount"  value={values.discount} onChange={onInput} class="form-control" id="p3" placeholder="Enter Discount" />
  </div>
  <div class="form-group">
    <label for="p4">Category</label>
    <input type="text" name="category"  value={values.category} onChange={onInput} class="form-control" id="p4" placeholder="Enter Category" />
  </div>

  <div class="form-group">
    <label for="p5">Description</label>
    <textarea class="form-control" name="description"  value={values.description} onChange={onInput} id="p5" placeholder="Enter Description" rows="3"></textarea>
  </div>

  <div class="form-group">
    <label for="p4">Upload Image</label>
    <input  onChange={handleImage} type="file"  class="form-control" id="p4" placeholder="Enter Category" />
  </div>

  <br></br>

  <img  src={values.temp_img}  width={100} height={100} />
  
  <button onClick={onSubmit} class="btn btn-primary">Submit</button>


        </div>

    )



}

export default AddProduct