import { useState } from 'react'
import products from './Data'
import ProductList from './ProductList'


function    ProductListWithSearch(){


  const [searchItem , setSearchItem ] =  useState("")
  const [dataToShow  , setDataToShow] = useState([])


  const hanldeSearch = (e) =>{

      setSearchItem(e.target.value)
    var d =  products.filter((el,i)=>{
        return el.name.toLowerCase().includes(e.target.value)
    })

    setDataToShow(d)
    

  }



  return(
<>
<input placeholder='Enter any text' value={searchItem} onChange={hanldeSearch} />
<ProductList products={dataToShow}/>
</>


  )





}

export default ProductListWithSearch