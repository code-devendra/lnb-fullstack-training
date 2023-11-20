import {Routes  , Route ,  Link} from 'react-router-dom'

import {lazy , Suspense} from 'react'

import Home from "../Screens/Home"

import About from "../Screens/About"



import Navbar from '../Layout/Navbar'
import ViewMore from '../Screens/ViewMore'
import MemoDemo from '../Screens/UseMemoDemo'
import CallbackDemo from '../Screens/UseCallbackDemo'
import A from '../Screens/ContextDemo'
import UseRefDemo from '../Screens/UseRefDemo'
import UseReducerDemo from '../Screens/UseReducerDemo'
import ProductListWithSearch from '../Screens/ProductsWithSearch'
import Comp1 from '../Screens/Comp-2'
import Comp2 from '../Screens/Comp-2'
import MyCart from '../Screens/MyCart'
import AddAddress from '../Screens/AddAddress'
import AddAddressForm from '../Screens/Address-Form'
import BannerComponent from '../Screens/Banner'
import Checkout from '../Screens/Checkout'
import AllOrders from '../Screens/AllOrders'
import Payment from '../Screens/Razor-Pay'
const HomeComponent  =  lazy(()=>import('../Screens/Home'))

function AllRoutes(){


 const RenderHome =  ()=>{
    return(
        <Suspense fallback={<div>Data is loading please wait...</div>}>
                <HomeComponent />
            </Suspense>
    )
 }   


return(
<>
    <Navbar/>
    <Routes>

    <Route path="/"  element={<RenderHome/>} />
    <Route path="/home"  element={<RenderHome/>} />
    <Route path="/memo-demo"  element={<MemoDemo/>} />
    <Route path="/callback-demo"  element={<CallbackDemo/>} />
    <Route path="/context-demo"  element={<A/>} />
    <Route path="/useRef-demo"  element={<UseRefDemo/>} />
    <Route path="/useReducer-demo"  element={<UseReducerDemo/>} />
    <Route path="/products"  element={<ProductListWithSearch/>} />
    <Route path="/about"  element={<About/>} />
    <Route path="/comp1"  element={<Comp1/>} />
    <Route path="/comp2"  element={<Comp2/>} />
    <Route path="/my-cart"  element={<MyCart/>} />
    <Route  path='/viewmore/:id' element={<ViewMore/>} />
    <Route  path='/add-address' element={<AddAddress/>} />
    <Route  path='/add-address-form' element={<AddAddressForm/>} />
    <Route  path='/banners' element={<BannerComponent/>} />
    <Route  path='/checkout' element={<Checkout/>} />
    <Route  path='/allorders' element={<AllOrders/>} />
    <Route  path='/razorpay' element={<Payment/>} />
    <Route  path='/verify' element={<Home/>} />
    <Route  path='*' element={<Home/>} />

</Routes>
</>


)



}

export default AllRoutes