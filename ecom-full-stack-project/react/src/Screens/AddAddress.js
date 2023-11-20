





import { Link } from "react-router-dom"
import '../Styles/Login.css'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { User_Base_URL } from "../Config/BaseURL"
import Lottie from 'react-lottie';
import {useNavigate} from 'react-router-dom'
import * as animationData from '../Assets/loading.json'
import { useDispatch, useSelector } from "react-redux"


const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};




function AddAddress(){
  const navigate = useNavigate()
  const [load , setLoad] = useState(false)
  const dispatch  = useDispatch()
  const uid  = useSelector((state)=> state.LoginReducer.auth._id ? state.LoginReducer.auth._id  :"" )
  const check_add  = useSelector((state)=> state.CartCount.address_flag ? state.CartCount.address_flag   :false )
  
  const [values , setValues]  = useState({
    uid   : uid,
   
    house_no   : "",
    street : "",
    landmark : "",
    country : "India",
    state : "Rajasthan",
    city : "Jaipur",
    pincode : "302012",
    lat: "",
    long: "",
    alter_mobile : ""
  })


  const checkMyAddress  = ()=>{
    axios.get(User_Base_URL + '/check-address' , {params  :{u_id:  uid}}).then((res)=>{
  
      dispatch({type : "ADDRESS_FLAG" ,  status : res.data.address_chk})
  
    }).catch((err)=>{
      toast.error(err.response.data.message)
  })
  }

  const handleInput = (e)=>{

    setValues({...values  ,[e.target.name]  : e.target.value})

  }

  const handleSubmit = ()=>{

    if(values.house_no =="" )
    {
      toast.error("Please Enter House No. ")
    }
    else if(values.street == "")
    {
      toast.error("Please Enter Street Address")

    }
    else if(values.landmark =="")
    {
      toast.error("Please Enter Landmark ")

    }
    else if(values.country== ""){
      toast.error("Please Enter Country ")

    }
    else if(values.state ==""){
      toast.error("Please Enter State ")

    }
    else if(values.city ==""){
      toast.error("Please Enter City ")

    }
    else{
      setLoad(true)
      axios.post(User_Base_URL + '/add-address' , values).then((res)=>{
        toast.success(res.data.message)
        setLoad(false)
        checkMyAddress()
        navigate('/my-cart')
      }).catch((err)=>{
        toast.error(err.response.data.message)
        setLoad(false)
      })
      
    }

  }

  useEffect(()=>{
    if(check_add == true)
    {
        navigate('/my-cart')
    }
    {

    }
  },[check_add])



return(
    <div  style={{marginTop :200}}>

    {load == true ?

<>
<Lottie options={defaultOptions}
          height={400}
          width={400}
          isStopped={false}
          isPaused={false}/>
          <h5 style={{color  :"red" , textAlign : "center"}}>Please Wait While we are fetching data for You ...</h5>

          </>

          :

    <div className="login-div card">
      <h4>Add Your Delivary Address</h4>
      <div className="form-group">
    <label for="l1">House No.</label>
    <input type="text"  name="house_no" value={values.house_no}  onChange={handleInput} className="form-control" id="l1"  placeholder="Enter Your House No"/>
  </div>
    <div className="form-group">
    <label for="l2">Street Address</label>
    <input type="email"  name="street" value={values.street}  onChange={handleInput}  className="form-control" id="l2"  placeholder="Enter Your Street Address"/>
  </div>
    <div className="form-group">
    <label for="l3">Landmark</label>
    <input type="text"  name="landmark" value={values.landmark}  onChange={handleInput} className="form-control" id="l3"  placeholder="Enter Landmark "/>
  </div>
    <div className="form-group">
    <label for="l3">Pincode</label>
    <input type="number"  name="pincode" value={values.pincode}  onChange={handleInput} className="form-control" id="l3"  placeholder="Enter Pincode"/>
  </div>
  <div className="form-group">
    <label for="l4">Country</label>
    <input style={{width : "100%"}} value={values.country}   onChange={handleInput} type="text" name="country" className="form-control" id="l4" placeholder="Enter Country"/>
  </div>
  <div className="form-group">
    <label for="l4">State</label>
    <input style={{width : "100%"}} value={values.state}   onChange={handleInput} type="text" name="state" className="form-control" id="l4" placeholder="Enter State"/>
  </div>
  <div className="form-group">
    <label for="l4">City</label>
    <input style={{width : "100%"}}  value={values.city}  onChange={handleInput} type="text" name="city" className="form-control" id="l4" placeholder="Enter city"/>
  </div>
  <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>

 
    </div>
}

    </div>
)



}

export default AddAddress