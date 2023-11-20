

import { useState } from "react"
import FinalRouting from "./Routing/FinalRouting"
import {Provider, useSelector} from 'react-redux'
import store from "./Store/Store"



function App(){
 store.subscribe(()=>{
    localStorage.setItem( 'reduxStore' ,  JSON.stringify(store.getState()))
 })



    return(

        <>


            <Provider  store={store}>


            <FinalRouting/>

            </Provider>
       


        
        </>
        
    )



}


export default App