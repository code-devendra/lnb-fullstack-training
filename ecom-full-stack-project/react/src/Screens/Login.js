import { useState } from "react"
import '../Styles/Login.css'
import { Link } from "react-router-dom"
import {useDispatch} from 'react-redux'
import { toast } from "react-toastify";
import { User_Base_URL } from "../Config/BaseURL";
import axios from "axios";
import Lottie from 'react-lottie';
import * as animationData from '../Assets/loading.json'






const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};




function Login(){

  const dispatch = useDispatch()


  const [load , setLoad ] =  useState(false)


    const [values , setValues]  = useState({

        email : "",
        password : "",
        

    })

    const handleSubmit = () =>{
      if(!values.email )
      {
        toast.error("Please Enter Your Email")
      }
      else if(!values.password )
      {
        toast.error("Please Enter Your Password")
      }
      else{

        setLoad(true)
        axios.post(User_Base_URL + '/login-user' , values).then((res)=>{

          toast.success(res.data.message)
          dispatch({type : "LOGIN" , data : res.data.data })
          console.log(res.data.data)
          setLoad(false)

        }).catch((err)=>{

          toast.error(err.response.data.message)
          setLoad(false)

          dispatch({type : "LOGIN" , data : {} })




        })
      }
    }

    const handleInput = (e) =>{

      setValues({...values, [e.target.name]  :e.target.value})
    }


 
return(
    <>

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
    <div className="parent">

    <div className="login-div card">
      <h4>Login Here</h4>
    <div className="form-group">
    <label for="email">Email address</label>
    <input type="email" onChange={handleInput}  value={values.email} name="email" className="form-control" id="email"  placeholder="Enter Your email"/>
  </div>
  <div className="form-group">
    <label for="password">Password</label>
    <input onChange={handleInput} value={values.password} style={{width : "100%"}} type="password" name="password" className="form-control" id="password" placeholder="Enter Your Password"/>
  </div>
  <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>

<br></br>
<br></br>
<br></br>
 
  <h6>Don't have an account ? <Link to='/register' >Register Here </Link></h6>

  <h6>Forgot Your Password ?<Link to="/forgotPassword" >Reset Here </Link></h6>
    </div>


    </div>
}
        
    </>
)



}

export default Login