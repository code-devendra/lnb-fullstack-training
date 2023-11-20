




const LoginReducer = (state, action)=>{


    if(typeof state == 'undefined'){
        return{

            auth : ""
        }
    }


    switch(action.type){


        case "LOGIN":

            return{
                auth   : action.data
            }

         case "LOGOUT":
            return{
                auth : {}
            }   

    default:
        return state



    }

}

export default LoginReducer