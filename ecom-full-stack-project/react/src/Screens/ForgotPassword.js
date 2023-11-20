import { useState } from "react"
import '../Styles/Login.css'
import { Link } from "react-router-dom"
import {useDispatch} from 'react-redux'
import Lottie from 'react-lottie';
import * as animationData from '../Assets/loading.json'
import { toast } from "react-toastify";
import { User_Base_URL } from "../Config/BaseURL";
import axios from "axios";
import {useNavigate} from 'react-router-dom'



const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  


 function ForgotPassword(){

    const dispatch = useDispatch()
    const navigate =  useNavigate()


    const [load , setLoad ] =  useState(false)
    const [otp_flag ,  set_otp_flag] = useState(false)
    const [otp_exp ,  set_otp_exp] = useState(false)
  
  
      const [values , setValues]  = useState({
  
          email : "",
          otp : "",
          password : ""
          
  
      })
  
      const handleSubmit = () =>{
        if(!values.email )
        {
          toast.error("Please Enter Your Email")
        }
        else{
  
          setLoad(true)
          axios.post(User_Base_URL + '/send_otp' , values).then((res)=>{
  
            toast.success(res.data.message)
            setLoad(false)
            set_otp_flag(true)
  
          }).catch((err)=>{
  
            toast.error(err.response.data.message)
            setLoad(false)
  
  
  
  
  
          })
        }
      }
  
      const handleInput = (e) =>{
  
        setValues({...values, [e.target.name]  :e.target.value})
      }
  

      const handleVerifyOtp = () =>{

        if(!values.otp)
        {
            toast.error("Please Enter OPT")
        }
        else if(!values.password)
        {
            toast.error('Please Enter New Password')
        }
        else{
            setLoad(true)
            axios.post(User_Base_URL + '/verify_otp' , values).then((res)=>{
    

            
              toast.success(res.data.message)
              setLoad(false)
              set_otp_flag(false)
              navigate('/login')
    
            }).catch((err)=>{
                toast.error(err.response.data.message)
                if(err.response.data.status == 401)
                {
                    set_otp_exp(true)
                    setValues({...values , otp : "" ,  password  :""})
                    set_otp_flag(false)
                }
              setLoad(false)
    
    
    
    
    
            })
        }

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
        <div style={{display : "flex" ,  width : "100%" ,  height :  30  , justifyContent:"center"}}>
      <h4 style={{textAlign:"center"}}>RESET YOUR PASSWORD</h4>

        </div>
        <br></br>
    <div className="form-group">

    <input type="email" disabled={otp_flag} onChange={handleInput}  value={values.email} name="email" className="form-control"   placeholder="Enter Your email"/>
  </div>

  {otp_flag == true?
  <>
<br></br>
  <div className="form-group">

    <input type="number" onChange={handleInput}  value={values.otp} name="otp" className="form-control"   placeholder="Enter Your OTP"/>
  </div>
  <br></br>
  <div className="form-group">

    <input type="password" onChange={handleInput}  value={values.password} name="password" className="form-control"   placeholder="Enter New Password"/>
  </div> </>: null }

    {otp_flag == false ?

  <button onClick={handleSubmit} type="submit" className="btn btn-primary">  {set_otp_exp == true ? 'RESEND OTP' : 'SEND OTP' }</button>
  :
  <button onClick={handleVerifyOtp} type="submit" className="btn btn-primary"> RESET MY PASSWORD</button>
    }

<br></br>
<br></br>
<br></br>
 
  <h6>Don't have an account ? <Link to='/register' >Register Here </Link></h6>

    </div>


    </div>
}
    
    
    </>
)




 }


 export default ForgotPassword