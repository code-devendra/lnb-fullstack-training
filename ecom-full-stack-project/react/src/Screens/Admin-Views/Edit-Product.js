import axios from "axios"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { Admin_Base_URL } from "../../Config/BaseURL"










const EditProduct = ()=>{

    const {state} = useLocation()

    console.log(state)


    const [values , setValues ]=  useState({

        name :state.name,
        image :state.image,
        category :state.category,
        price :state.price,
        discount :state.discount,
        description :state.description,
        p_id : state._id,
        temp_url    : state.image,
        pre_path  : state.image
    })



    const onEdit = ()=>{

      console.log("Hello")
      

      let fd =  new FormData()
      fd.append('name' ,  values.name)
      fd.append('p_id' ,  values.p_id)
      fd.append('price' ,  values.price)
      fd.append('discount' ,  values.discount)
      fd.append('category' ,  values.category)
      fd.append('description' ,  values.description)
      fd.append('pre_path' ,  values.pre_path)
      fd.append('img' ,  values.image)



      axios.post(Admin_Base_URL + '/edit-products' , fd).then((res)=>{
        toast.success(res.data.message)
      }).catch((err)=>{
      toast.error(err.response.data.message)
      })



    }


    const onChangeInput= (e)=>{

     setValues({...values , [e.target.name] :  e.target.value})

    }

    const handleImageChange  = (e )=>{


    setValues({...values ,     ['image']  : e.target.files[0]   ,  ['temp_url']  : URL.createObjectURL(e.target.files[0] ) })



    }



    return(


<>

<div className="container">


{/* <form> */}
  <div class="form-group">
    <label >Produt Name</label>
    <input type="text" name="name" onChange={onChangeInput} class="form-control" value={values.name}  aria-describedby="emailHelp" placeholder="Enter Product Name" />
  </div>
  <div class="form-group">
    <label >Product Category</label>
    <input type="text" name="category" onChange={onChangeInput} class="form-control" value={values.category}  placeholder="Enter Category" />
  </div>
  <div class="form-group">
    <label >Product Price</label>
    <input type="number" name="price" onChange={onChangeInput} class="form-control" value={values.price}  placeholder="Enter Price" />
  </div>
  <div class="form-group">
    <label >Product Discount</label>
    <input type="number" name="discount" onChange={onChangeInput} class="form-control"  value={values.discount} placeholder="Enter Discount" />
  </div>
  <div class="form-group">
    <label >Product Description</label>
    <textarea type="text" name="description" onChange={onChangeInput} class="form-control" rows={4} value={values.description}  placeholder="Enter Description" />
  </div>


  <img src={values.temp_url} style={{width:'200px', height:'200px'}}/>


  <div class="form-group">
    <label className="btn btn-success"   for="imu"  style={{width  :"200px"}} > Change Product Image</label>
    <input onChange={handleImageChange} type="file" style={{display:"none"}}  id="imu"  class="form-control"    />
  </div>

  <button onClick={onEdit} type="submit" class="btn btn-primary">Update Product</button>

      


{/* </form> */}

</div>
</>


    )


}

export default EditProduct