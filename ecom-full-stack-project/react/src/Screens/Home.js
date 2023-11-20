import {useEffect, useState } from 'react'
import '../Styles/Cards.css'
import { useNavigate } from 'react-router-dom'
import useFetch from '../Routing/UseFetch'
import axios from 'axios'
import { User_Base_URL  , Admin_Base_URL} from '../Config/BaseURL'
import { useSelector , useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

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





function Home(){


  const dispatch = useDispatch()

  const uid  =  useSelector((state)=> state.LoginReducer.auth._id)

  const navigate = useNavigate()

  const [data , setdata ] = useState([])
  const [c_data ,  set_c_data] =  useState([]) 

 
function fetchData(){


  axios.get(User_Base_URL + '/get-all-products').then((res)=>{
    console.log(res)
    setdata(res.data.data)
  }).catch((err)=>{
    if (!err.response) {
      // network error
      toast.error("Not able to connect With Server")
  } else {
    alert(err.response.data.message)
  }
  })



}



useEffect(()=>{
  gteCartItems()
},[])


function modifydata(){

  let pd  = data;
  let cd = c_data;

  for(let i = 0 ; i < cd.length ; i++)
  {

      for(let j = 0 ; j < pd.length ; j++)
      {

        if(cd[i].p_id == pd[j]._id)
        {
        
          pd[j]['disable'] = true
        }


      }

  }

  console.log(pd)

  return pd



}


const handleNavigate=  (el)=>{

 navigate('/viewmore/'  +el._id,  {state : el })

}

const [act , setAct ] = useState(0)
useEffect(()=>{
fetchData()
getHomBanners()

},[])



    


// const handleSearch = (e) =>{
// let tmp  =  o_data;
// let fd = tmp.filter((el)=>{

//   return  el.title.toLowerCase().includes(e.target.value.toLowerCase())
// })


// setData(fd)


// }


const [banners , setBanners] = useState([])

function getHomBanners(){

axios.get(Admin_Base_URL + '/get-banners').then((res)=>{
  setBanners(res.data.data)
}).catch((err)=>{
  toast.error(err.response.data.message)
})

}


function gteCartItems(){
  axios.get(User_Base_URL  +'/get-my-cart' ,{params  :{uid: uid}}).then((res)=>{
    set_c_data(res.data.data)
    dispatch({type : "CART_COUNT" , count  : res.data.count})
  }).catch((err)=>{
    if (!err.response) {
      // network error
      toast.error("Not able to connect With Server")
  } else {
    toast.error(err.response.data.message)
  }
  })
}



function AddtoCart(pdata){

  console.log(pdata)

  let dt  = {
    p_id : pdata._id,
    u_id : uid
  }

  axios.post(User_Base_URL  + '/add-to-cart' , dt).then((res)=>{
    toast.success(res.data.message)
    gteCartItems()
  }).catch((err)=>{
    toast.error(err.response.data.message)
  })


}




const onPre=()=>{



    setAct(act - 1)
  
 

}

const onNext = ()=>{

  

  setAct(act + 1)

}





return(
    <>





<div className='container-centre'>

<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    {banners.reverse().map((el,i)=>(

    <div class={`carousel-item ${  i == act ? 'active' : ""}`}>
      <img class="d-block w-100"  src={el.banner_image} alt="First slide" />
    </div>

    ))}
  </div>
  <button disabled={act == 0} onClick={onPre} class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </button>
  <button disabled={act  == banners.length -1} onClick={onNext} class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </button>
</div>


{Array.isArray(modifydata()) && modifydata().length > 0 ?

<>

{modifydata().map((el,i)=>(
  <div class="card" style={{width: '18rem'}}>
  <img class="card-img-top" src={el.image} alt="Card image cap" />
  <div class="card-body">
    <h5 class="card-title">{el.name.length > 20 ? el.name.slice(0,21)  + " ..." : el.name }</h5>
    <h5 class="card-title">Discount &#8377; {Math.floor(el.price  - (el.price * (el.discount / 100))) }</h5>
    <h5 class="card-title" >M.R.P <s> &#8377;{el.price} ({el.discount + " %"})</s> </h5>
    <p class="card-text">{el.description.length > 20 ? el.description.slice(0,21)  + " ..." : el.description}</p>

    <a onClick={()=>{handleNavigate(el)}} class="btn btn-primary">View More</a>
    {el.disable == true ?
    
    <button disabled={true}  class="btn btn-danger">Already Added </button>
    :
    <button onClick={()=>{AddtoCart(el)}}  class="btn btn-success">Add To Cart</button>
}
  </div>
</div>

))}

</>

: 

<>
<Lottie options={defaultOptions}
height={400}
width={400}
isStopped={false}
isPaused={false}/>
<h5 style={{color  :"red" , textAlign : "center"}}>Please Wait While we are fetching data for You ...</h5>

</>
}



</div>



    
    
    </>
)


}

export default Home