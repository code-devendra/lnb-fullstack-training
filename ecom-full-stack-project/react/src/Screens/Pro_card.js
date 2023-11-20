

const ProductCard =  (props) =>{

    console.log(props)


return(

    <div className="product">
        <p>
            <b>Title</b>{props.name}
        </p>
        <p>
            <b>Price</b>{props.price}
        </p>
        <p>
            <b>Discount</b>{props.discount}
        </p>
        <hr/>
    </div>

)



}

export default ProductCard
