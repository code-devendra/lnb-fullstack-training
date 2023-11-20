import WithCounter from "./HOC-Comp"


const Comp2 = ({count , handleCount}) =>{





return(

    <button onMouseOver={handleCount} >Clicked {count} Times</button>

)



}
export default WithCounter(Comp2)




