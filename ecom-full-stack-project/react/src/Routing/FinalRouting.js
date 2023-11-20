
import AuthRoutes from "./AuthRoutes"
import AllRoutes from "./AllRoutes"
import { useSelector} from 'react-redux'
import AdminRoutes from "./AdminRoutes"



function FinalRouting(){

    const auth  =  useSelector((state)=> state.LoginReducer.auth && state.LoginReducer.auth._id != '' && state.LoginReducer.auth._id != null && state.LoginReducer.auth._id != 'undefined'  ? true :  false )
    const role = useSelector((state)=> state.LoginReducer.auth && state.LoginReducer.auth.role ? state.LoginReducer.auth.role : "" )


return(
<>


    { !auth ?   <AuthRoutes/>   :   <> {  role == 'Customer' ?  <AllRoutes/> :   <AdminRoutes/>  }</>   }

</>



)



}

export default FinalRouting

