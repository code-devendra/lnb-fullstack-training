
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch  ,useSelector} from 'react-redux'
import '../Styles/Navbar.css'



function AdminNavbar(){
  const navigate =  useNavigate()
  const dispatch = useDispatch()


const cart_count =  useSelector((state)=> state.CartCount.cart_count ?  state.CartCount.cart_count   :0)
const user_name  = useSelector((state)=> state.LoginReducer.auth && state.LoginReducer.auth.name ? state.LoginReducer.auth.name : "")
  const handleLogout =() =>{
    dispatch({type  : "LOGOUT"})
  }



    return(


        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand" href="#">Hi , {user_name}</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
      </ul>
      <div class="d-flex" role="search">
      
        <button style={{marginLeft : 20}} onClick={handleLogout} class="btn btn-outline-success" type="submit">Logout</button>
      </div>
    </div>
  </div>
</nav>


    )




}

export default AdminNavbar