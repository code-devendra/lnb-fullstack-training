import axios, { toFormData } from "axios"
import { useEffect, useState } from "react"
import { User_Base_URL } from "../Config/BaseURL"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"

import Lottie from 'react-lottie';
import * as animationData from '../Assets/ndf.json'
import { Link, useNavigate } from "react-router-dom"



const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};









const MyCart  = ()=>{


        const [data , setData ] =  useState([])
        const dispatch = useDispatch()
        const navigate= useNavigate()

const uid = useSelector((state)=> state.LoginReducer.auth._id)
const email  = useSelector((state)=> state.LoginReducer.auth.email)
const u_name  = useSelector((state)=> state.LoginReducer.auth.name)
const add_flag   = useSelector((state)=> state.CartCount.address_flag ?state.CartCount.address_flag :  false )

const checkMyAddress  = ()=>{
  axios.get(User_Base_URL + '/check-address' , {params  :{uid:  uid}}).then((res)=>{

    dispatch({type : "ADDRESS_FLAG" ,  status : res.data.address_chk})

  }).catch((err)=>{
    toast.error(err.response.data.message)
})
}


const [addresses , setAddresses] = useState([])

const getMyAddress  = ()=>{
  axios.get(User_Base_URL + '/get-user-addresses' , {params  :{uid:  uid}}).then((res)=>{

    setAddresses(res.data.data)

  }).catch((err)=>{
    toast.error(err.response.data.message)
})
}


   const getDetailsCart= ()=>{

        axios.get(User_Base_URL  + '/get-my-cart-details' , {params : {uid : uid}}).then((res)=>{

            console.log(res.data.data)
            setData(res.data.data)
            dispatch({type : "CART_COUNT" , count  : res.data.data.length})


        }).catch((err)=>{
            toast.error(err.response.data.message)
        })

    }


    useEffect(()=>{
      checkMyAddress()

        getDetailsCart()
        getMyAddress()

    },[])


    function calculateTotal()
    {

      let total  =0;
      for(let i = 0 ; i < data.length ; i++){
        total += Math.floor(data[i].p_data.price  - (data[i].p_data.price * (data[i].p_data.discount / 100))) * ( data[i].quantity)
      }

      return total

    }

    const handleMore = (cd)=>{
      
      let dt =  {
        quantity : cd.quantity + 1,
        cid : cd._id
      }

      axios.post(User_Base_URL + '/modify-quantity' , dt).then((res)=>{
        toast.success(res.data.message)
        getDetailsCart()
      }).catch((err)=>{
        toast.error(err.response.data.message)
      })

    }

    const handleLess = (cd)=>{
      let dt =  {
        quantity :cd.quantity - 1,
        cid : cd._id
      }
      if((cd.quantity -1)  == 0)
      {
       
        var y =  window.confirm('Do You want to Remove This Item ?')
        if(y == true)
        {
          
          axios.post(User_Base_URL + '/modify-quantity' , dt).then((res)=>{
            toast.success(res.data.message)
            getDetailsCart()
            
          }).catch((err)=>{
            toast.error(err.response.data.message)
          })
        }
      }
      else{
      axios.post(User_Base_URL + '/modify-quantity' , dt).then((res)=>{
        toast.success(res.data.message)
        getDetailsCart()
        
      }).catch((err)=>{
        toast.error(err.response.data.message)
      })
      }

    }


    const [selectedAddressId , setSelectedAdressId]  = useState("")
    const [selectedAddressData , setSelectedAdressData]  = useState({})

    const selectAddress  = (e)=>{
      console.log(e)

      setSelectedAdressId(e._id)
      setSelectedAdressData(e)


    }


    const ProceedToBuy = ()=>{
      if(selectedAddressId == "")
      {
        toast.info("Please Select At Least One Address")
      }
      else{
        let checkoutData  =  {
          uid : uid,
          name  :  u_name,
          email : email,
          order_data :  data,
          total_price  : calculateTotal(),
          address_id  : selectedAddressId
        }
        navigate('/checkout' , {state : checkoutData})
      }
    }


 return(

    <>
{add_flag == false ?
<div class="card" style={{width: "50%" , margin : "auto", display:"flex" ,  alignSelf:"center" ,  position  :"sticky" , position  :"-webkit-sticky"   ,marginBottom  : 10 }}>

  <div class="card-body">
    <p class="card-text" style={{textAlign  :"center" , color  :"red"  , fontWeight  :"bold"}}>You need to Add at least one address to process further</p>
    <Link to='/add-address' class="btn btn-danger">No Address Found ( Please Add Address )</Link>
  </div>
</div> : <></>}
    <div  style={{width : "90%" , margin :"auto"}}>

  



      {data.length > 0 ?

  <>
  <hr></hr>
    
    <div class="row">

    {add_flag ==true ?    
    <div  class={add_flag == true ? 'col-3' : ""}>
        <h4>Your Address</h4>
{addresses.map((el,i)=>(
 <div class="card" style={{ marginTop:3, width:"100%"}}>
 <div class="card-body">
   <h5 class="card-title">House No : {el.house_no}</h5>
   <h5 class="card-title"> {el.street}</h5>
   <h5 class="card-title"> {el.landmark}</h5>
   <h5 class="card-title"> {el.pincode} , {el.city} , {el.state}   </h5>
 </div>
 <div style={{padding: 20,marginLeft : 20}} class="form-check">
  <input onChange={()=>selectAddress( el)} class="form-check-input" type="radio"  name="flexRadioDefault" id="flexRadioDefault1" />
  <label class="form-check-label" for="flexRadioDefault1">
    Use this Address for Delivary
  </label>
</div>
</div>
))}
<button onClick={()=> navigate('/add-address-form')}  style={{backgroundColor:"#FFD814", width:"80%" ,margin:"auto" , color : "black"}} class="btn btn-primary">Add More Address</button>
 


  </div> :  <></>}


  <div  class={add_flag == true ? 'col-6' : "col-8"}>


{data.map((el,i)=>(



<>
  <div class="row" style={{padding: 10}}>


  <div class="col-4">

  <img style={{  display:"flex" , alignSelf:"center",alignItems  :"center", justifyContent:"center", width : 200 , height :200}} src={el.p_data.image} alt="Card image cap" />

  </div>
  <div  class="col-8">
  <h5 class="card-title">{el.p_data.name }</h5>
  <br></br>

  <h5 class="card-title">Discount &#8377; {Math.floor(el.p_data.price  - (el.p_data.price * (el.p_data.discount / 100))) }</h5>
  <br></br>
    <h5 class="card-title" >M.R.P <s> &#8377;{el.p_data.price} ({el.p_data.discount + " %"})</s> </h5>


    <div style={{marginTop: 10 , padding: 20}} class="container">
  <div class="row">
    <div class="col-sm-5" style={{display:"flex" , alignItems:"flex-end" , justifyContent:"right"}}>
    <button onClick={()=> handleLess(el)} style={{width:"50%" , fontSize:20, fontWeight:"bold"}}   class="btn btn-danger" >-</button>

    </div>
    <div class="col-sm-2" style={{textAlign:"center", display:"flex", justifyContent:"center" , verticalAlign:"center"}}>
     <h5 style={{margin  :"auto"}}>{el.quantity}</h5>
    </div>
    <div style={{display:"flex" , alignItems:"flex-end" , justifyContent:"left"}} class="col-sm-5">
    <button onClick={()=> handleMore(el)}  style={{width:"50%",fontSize:20, fontWeight:"bold"}}   class="btn btn-success">+</button>


    </div>
  </div>
</div>

  </div>



</div>

<hr></hr>
</>

))}



  </div>
  <div  class={add_flag == true ? 'col-3' : "col-4"}>
  <div class="card" style={{ marginTop:3, width:"100%"}}>
  <div class="card-body">
    <h5 class="card-title">Subtotal  : ({data.length} item)</h5>
    <h5 class="card-title">Total Amount to Pay: {calculateTotal()}</h5>
    <button onClick={ProceedToBuy} disabled={!add_flag}  style={{backgroundColor:"#FFD814", width:"80%" ,margin:"auto" , color : "black"}} class="btn btn-primary">Proceed To Buy</button>
  </div>
</div>
  </div>
</div>


</>

:

<Lottie options={defaultOptions}
height={400}
width={400}
isStopped={false}
isPaused={false}/>

}

</div>
    
    </>
 )



}

export default MyCart