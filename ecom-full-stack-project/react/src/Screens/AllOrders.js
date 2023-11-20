import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { User_Base_URL } from "../Config/BaseURL"
import { toast } from "react-toastify"
import moment from 'moment'






const AllOrders =  () =>{

    const uid  = useSelector((state)=> state.LoginReducer.auth._id ? state.LoginReducer.auth._id  :"" )

    const [data ,setData] = useState([])




    function getPreviosOrders(){
        axios.get(User_Base_URL+ '/getorders' , {params : {uid : uid}}).then((res)=>{
            setData(res.data.data.reverse())
            console.log(res.data.data)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    useEffect(()=>{

        getPreviosOrders()

    },[])



    const formatDate = (d)=>{
        let od =  new Date(Number(d))
        console.log(od)
        let md  =  moment(od).format('MMMM Do YYYY, h:mm:ss a');
        console.log(md)
        return md

    }

return(
<>

<div style={{display : "flex"   , flexDirection : "column" ,  width : "80%" , margin : "auto" , justifyContent  :"center" , alignItems  :"center"}}>

{data.map((el, i)=>(



<>
<div class="card" style={{width: "100%"}}>

<div class="container" style={{margin : 10}}>
  <div class="row">
    <div class="col-sm">
      <h6>Order Date</h6>
      <h6>{formatDate(el.order_date)}</h6>
    </div>
    <div class="col-sm">
      <h6>Shipping Address</h6>
      
      <h6>{el.delivery_address.house_no},{el.delivery_address.street},{el.delivery_address.landmark},{el.delivery_address.pincode},{el.delivery_address.city},{el.delivery_address.state} </h6>
    </div>
    <div class="col-sm">
        <h6>Total Price of Orders</h6>
        <h6>{el.total_price}</h6>
     
    </div>
    <div class="col-sm">
      <h6>Order Tracking Number</h6>
      <h6>{el._id}</h6>
    </div>
  </div>
</div>
  <div class="card-body">
    <h5 class="card-title">Product Details</h5>
    <p class="card-text">

    <div class="container">
        {el.order_data.map((ol ,j)=>(
            <>
  <div class="row">
  <div class="col-sm">
      <img class="card-img-top" src={ol.p_data.image} style={{width : "100px",   height  :"100px" , margin : 10}} alt="Card image cap" />

  </div>
  <div class="col-sm">
    <h4>MRP :  {ol.p_data.price}</h4>
    <h4>Product Discount :  {ol.p_data.discount}</h4>
    <h4>Price :  {ol.p_data.discount }</h4>
  </div>
</div>
<hr></hr>
            </>
        ))}

</div>
    </p>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
<hr />

</>
))}
</div>
</>
)



}

export default AllOrders