

import { Link } from "react-router-dom"
import '../Styles/Login.css'
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { User_Base_URL } from "../Config/BaseURL"
import Lottie from 'react-lottie';
import {useNavigate} from 'react-router-dom'
import * as animationData from '../Assets/loading.json'

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};




function Register(){
  const navigate = useNavigate()
  const [load , setLoad] = useState(false)
  
  const [values , setValues]  = useState({
    name :"" ,  email  :"" ,  mobile : "" , password  :"" ,  address : ""
  })


  const handleInput = (e)=>{

    setValues({...values  ,[e.target.name]  : e.target.value})

  }

  const handleSubmit = ()=>{

    if(values.name =="" )
    {
      toast.error("Please Enter Your Name ")
    }
    else if(values.email == "")
    {
      toast.error("Please Enter Your Email ")

    }
    else if(values.mobile =="")
    {
      toast.error("Please Enter Your Mobile ")

    }
    else if(values.password ==""){
      toast.error("Please Enter Your Password  ")

    }
    else if(values.address ==""){
      toast.error("Please Enter Your Address  ")

    }
    else{
      setLoad(true)
      axios.post(User_Base_URL + '/add-user' , values).then((res)=>{
        toast.success(res.data.message)
        setLoad(false)
        navigate('/login')
      }).catch((err)=>{
        toast.err(err.response.data.message)
        setLoad(false)
      })
      
    }

  }



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
      <h4>Regsiter Here</h4>
      <div className="form-group">
    <label for="l1">Name</label>
    <input type="text"  name="name"  onChange={handleInput} className="form-control" id="l1"  placeholder="Enter Your Name"/>
  </div>
    <div className="form-group">
    <label for="l2">Email address</label>
    <input type="email"  name="email" onChange={handleInput}  className="form-control" id="l2"  placeholder="Enter Your email"/>
  </div>
    <div className="form-group">
    <label for="l3">Mobile</label>
    <input type="number"  name="mobile" onChange={handleInput} className="form-control" id="l3"  placeholder="Enter Your Mobile"/>
  </div>
  <div className="form-group">
    <label for="l4">Password</label>
    <input style={{width : "100%"}}  onChange={handleInput} type="password" name="password" className="form-control" id="l4" placeholder="Enter Your Password"/>
  </div>
  <div className="form-group">
    <label for="l5">Address</label>
    <input style={{width : "100%"}} type="password" onChange={handleInput} name="address" className="form-control" id="l5" placeholder="Enter Your Address"/>
  </div>
  <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>

 
  <h5>Already have an account ? <Link to='/login' >Login Here </Link></h5>
    </div>
}

    </div>
)



}

export default Register