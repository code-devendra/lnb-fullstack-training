import ProductCard from "./Pro_card"


const ProductList = (props)=>{
    console.log(props)

    let {products} =  props

    return(

        <div>
            <div>
                <div><h2>Products</h2></div>
            </div>
            <div>
                {products.map((product)=> <ProductCard {...product} /> )}
            </div>
        </div>
    )


}

export default ProductList


