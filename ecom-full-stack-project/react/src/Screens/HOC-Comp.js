import { useState } from "react"






const WithCounter  =  OriginalComonent =>{

    const EnhancedComponent  =  () =>{


        const [count , setCount ] =  useState(0);


        const handleCount  =  () =>{

            setCount(count   +1)
        }

        return <OriginalComonent count={count}  handleCount ={handleCount} />



    }

    return EnhancedComponent







}

export default WithCounter