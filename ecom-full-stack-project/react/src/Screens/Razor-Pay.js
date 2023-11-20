import logo from '../Assets/logo.jpg';
import { User_Base_URL } from '../Config/BaseURL';

import DoPayemnt from '../Config/Payment'

// function loadScript(src) {
//     return new Promise((resolve) => {
//       const script = document.createElement('script')
//       script.src = src
//       script.onload = () => {
//         resolve(true)
//       }
//       script.onerror = () => {
//         resolve(false)
//       }
//       document.body.appendChild(script)
//     })
//   }

function App() {

    // async function displayRazorpay () {
    
    //     const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
    //       if (!res){
    //         alert('Razropay failed to load!!')
    //         return 
    //       }
    
    //       const data = await fetch(User_Base_URL + '/payment', {method: 'POST'}).then((t) => 
    //         t.json()
    //       ) 
    
    //       console.log(data)
    
    //     const options = {
    //       "key": "rzp_test_EzVF445P5NSPLb", // Enter the Key ID generated from the Dashboard
    //       "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //       "currency": "INR",
    //       "name": "Acme Corp",
    //       "description": "Test Transaction",
    //       "image": "https://example.com/your_logo",
    //       "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //       "callback_url":User_Base_URL +'/payment_process',
    //       "notes": {
    //           "address": "Razorpay Corporate Office"
    //       },
    //       "theme": {
    //           "color": "#3399cc"
    //       }
    //   };
    //   const paymentObject = new window.Razorpay(options); 
    //   paymentObject.open();
    //   }
    
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />   
            <button
            onClick={()=>DoPayemnt({amount :  500})}
            >
              Pay now 
            </button>
          </header>
        </div>
      );
    }
    
    export default App;