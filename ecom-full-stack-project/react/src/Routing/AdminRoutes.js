import {Routes  , Route ,  Link} from 'react-router-dom'




import AdminHome from '../Screens/Admin-Views/Admin-home'
import AdminNavbar from '../Layout/Admin-Navbar'
import EditProduct from '../Screens/Admin-Views/Edit-Product'
import AddProduct from '../Screens/Admin-Views/Add-Product'


function AdminRoutes(){




return(
<>
<AdminNavbar/>
    <Routes>

    <Route path="/"  element={<AdminHome/>} />
    <Route path="/edit-product/:id"  element={<EditProduct/>} />
    <Route path="/home"  element={<AdminHome/>} />
    <Route path="/add-product"  element={<AddProduct/>} />
    <Route  path='*' element={<AdminHome/>} />

</Routes>
</>


)



}

export default AdminRoutes