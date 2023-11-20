import { toast } from 'react-toastify';
import logo from '../Assets/logo.jpg';
import { User_Base_URL } from './BaseURL';
import axios from 'axios';


function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }


    async function displayRazorpay (pro_data) {
    
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
          if (!res){
            alert('Razropay failed to load!!')
            return 
          }
    
        //   const data = await fetch(User_Base_URL + '/payment', {method: 'POST'}).then((t) => 
        //     t.json()
        //   ) 


          
          axios.post(User_Base_URL + '/payment' , {amount   : pro_data.amount}).then((result)=>{

            const options = {
                "key": "rzp_test_EzVF445P5NSPLb", // Enter the Key ID generated from the Dashboard
                "amount": pro_data.amount  *  100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Test Ecom",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": result.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url":axios.post(User_Base_URL  +'/payment_process', {name : "Bhanu"}),
                
                "notes": {
                    "address": "E-Com"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            const paymentObject = new window.Razorpay(options); 
            paymentObject.open();

          }).catch((err)=>{


            toast.error(err.response.data.message)

          })
    
        //   console.log(data)
    
        
      }
    
   

    
    export default displayRazorpay;