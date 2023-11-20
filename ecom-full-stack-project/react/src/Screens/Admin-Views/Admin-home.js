import { useEffect, useState } from "react"
import { Admin_Base_URL } from "../../Config/BaseURL"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify"







const AdminHome = ()=>{

  const navigate = useNavigate()


    const [data , setData] = useState([])
    const [bkp_data , set_bkp_data] =  useState([])

    const [page_no ,setPageNo] = useState(0)
    const [data_length ,setDataLength] = useState(0)
    const [total ,setTotal] = useState(0)

    const [qu, setQu]= useState("")

   

    const onSearch = (e) =>{

      if(e.target.value != "")
      {
        
        axios.get(Admin_Base_URL + '/search-products', {params : {data_length : 5 ,  page_no : page_no , q : e.target.value}}).then((res)=>{
          console.log(res.data.pagination)
           setData(res.data.data)
           set_bkp_data(res.data.data)
           setDataLength(res.data.pagination.data_length)
           setTotal(res.data.pagination.total)
           setPageNo(res.data.pagination.page_no)
       })
      }
      setQu(e.target.value)

      

    }


    function fetchAllProduct (){



    
     
      

        axios.get(Admin_Base_URL + '/get-products', {params : {data_length : 5 ,  page_no : page_no}}).then((res)=>{
           console.log(res.data.pagination)
            setData(res.data.data)
            set_bkp_data(res.data.data)
            setDataLength(res.data.pagination.data_length)
            setTotal(res.data.pagination.total)
            setPageNo(res.data.pagination.page_no)
        })

    }

    useEffect(()=>{
        fetchAllProduct()
    },[])



    function onPre(){

        axios.get(Admin_Base_URL + '/get-products', {params : {data_length : 5 ,  page_no : page_no - 1}}).then((res)=>{
            console.log(res.data.pagination)
             setData(res.data.data)
             setDataLength(res.data.pagination.data_length)
             setTotal(res.data.pagination.total)
             setPageNo(res.data.pagination.page_no)
         })

    }

    function onNext(){

        axios.get(Admin_Base_URL + '/get-products', {params : {data_length : 5 ,  page_no : page_no +1}}).then((res)=>{
            console.log(res.data.pagination)
             setData(res.data.data)
             setDataLength(res.data.pagination.data_length)
             setTotal(res.data.pagination.total)
             setPageNo(res.data.pagination.page_no)
         })

    }



  const onEdit = (el)=>{


  navigate('/edit-product/'+ el._id , {state : el})

    


  }



  const onDelete = (el) =>{

    let wc = window.confirm('Do You really want to delete this Product ?')

    if(wc == true)
    {

    

    const data = {
      p_id : el._id
    }
    axios.post(Admin_Base_URL + '/delete-products' , data ).then((res)=>{

      toast.success(res.data.message)
      fetchAllProduct()

    }).catch((err)=>{

      toast.error(err.response.data.message)

    })
  }

  }

return(

<>

<div style={{width:'80%' , margin : "auto",padding :40}} class="form-inline my-2 my-lg-0">
      <input onChange={onSearch}  value={qu} class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button onClick={()=>navigate('/add-product')}  className="btn btn-success" >Add-Product</button>
    </div>
<table class="table" style={{width :'95%', margin:"auto"}}>
  <thead>
    <tr>
      <th scope="col">SR#</th>
      <th scope="col">Image</th>
      <th scope="col">Product Name</th>
      <th scope="col">Price</th>
      <th scope="col">Discount</th>
      <th scope="col">Category</th>
      <th scope="col">Description</th>
      <th scope="col">Delete </th>
      <th scope="col">Edit</th>

    </tr>
  </thead>
  <tbody>

    {data.map((el,i)=>(


    <tr>
      <th scope="row">{i+1 +  ( page_no *  data_length)}</th>
      <td><img src={el.image} width='100px' height='100px' /></td>
      <td>{el.name}</td>
      <td>{el.price}</td>
      <td>{el.discount}</td>
      <td>{el.category}</td>
      <td>{el.description}</td>
      <td style={{cursor:"pointer"}}><i onClick={()=>onDelete(el)} class="fa-solid fa-trash"></i></td>
      <td style={{cursor:"pointer"}}><i onClick={()=>onEdit(el)} class="fa-solid fa-pen-to-square"></i></td>
    </tr>

    ))}

    <tr  style={{textAlign:"center"}}>
        <td  colSpan={6}>

    <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item ">
      <button  disabled={page_no == 0} onClick={onPre} class="page-link"  tabindex="-1">Previous</button>
    </li>
    <li class="page-item active">
      <button  class="page-link" href="#"> {(page_no * data_length)} to {(page_no * data_length) + 5} of {total}</button>
    </li>
    <li class={`page-item ${data.length <  data_length ? 'disabled' :""} `}>
      <a onClick={onNext} class="page-link" >Next</a>
    </li>
  </ul>
</nav>
        </td>
    </tr>
   
  </tbody>
</table>

</>

)



}

export default AdminHome