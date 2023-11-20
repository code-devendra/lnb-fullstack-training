




const CartCount  =  (state, action) =>{


    if(typeof state == 'undefined')
    {

        return{
            cart_count : 0,
            address_flag : false
        }

    }

    switch(action.type){


        case "CART_COUNT":
            return{
                ...state,
                cart_count : action.count
            }
        case "ADDRESS_FLAG":
            return{
                ...state,
                address_flag : action.status
            }

        default:
            return state

    }





}


export default CartCount