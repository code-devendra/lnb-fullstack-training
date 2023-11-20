import {useEffect, useState} from 'react'
import {useSelector ,  useDispatch} from 'react-redux'


function About(){
    const dispatch = useDispatch()

    var count =  useSelector((state)=> state.CountReducer.count ? state.CountReducer.count  :0 )



const handleIncre= ()=>{

    dispatch({type :  "INCRE" ,  count : count  +1})


}

const handleDecre = () =>{

    dispatch({type :  "DECRE" ,  count : count   -1})


}



    return(
        <>
        <h1>Value of Count is : {count}</h1>
        
        <div style={{width : 100 ,  height:100 , backgroundColor:"green" ,  border : "1px solid black"}}></div>
        
        <button  onClick={handleIncre}>Incre</button>
        <button  onClick={handleDecre}>Decre</button>
        </>
    )
    
    
    }
    
    export default About