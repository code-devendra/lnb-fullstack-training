


import { useState } from 'react'
import '../Styles/Banners.css'
import { useEffect } from 'react'
import { Admin_Base_URL } from '../Config/BaseURL'
import axios from 'axios'




const BannerComponent =  ()=>{





   const [banners , setBanners] = useState([])

function getHomBanners(){

axios.get(Admin_Base_URL + '/get-banners').then((res)=>{
  setBanners(res.data.data)
})

}


useEffect(()=>{

    getHomBanners()

},[])



return(
//     <div class="ban-container">
//     <div class="ban-banner">
//         {banners.map((el,i)=>(

//     <img src={el.banner_image} alt="Banner Image" />
//         ))}

//     </div>
// </div>

<div style={{width:"100%"}}>
    <img style={{ width:"100%"}}   src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/84ae27f93c14a4e3.jpg'/>
    
</div>
)    


}

export default BannerComponent