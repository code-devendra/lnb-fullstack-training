import WithCounter from "./HOC-Comp"

const Comp1 = ({count , handleCount}) =>{





return(


    <button onClick={handleCount} >Clicked {count} Times</button>

)



}
export default WithCounter(Comp1)




