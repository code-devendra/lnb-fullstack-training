import {useEffect, useRef, useState} from 'react'




const UseRefDemo =  () =>{


    const [value , setValue ]  = useState("")
 const inputEl =  useRef()



 useEffect(()=>{

    inputEl.current =  value

 },[value])
 
 const hanldeFocus  = () =>{

    if(! value)
    {
        inputEl.current.style.border = '2px solid red'
    }
   else{
    inputEl.current.style.border = '2px solid green'

   }
    


 }



return(
    <>
    <title>Use Ref Demo</title>
<input placeholder='Enter any Value' ref={inputEl}  value={value}  onChange={(e)=> setValue(e.target.value)}   />
<br/>
<br/>

<button onClick={hanldeFocus} >Click ME</button>

<h1>Current Value : {value}</h1>
<h1>Previous Value : {inputEl.current}</h1>
    </>


)


}


export default UseRefDemo