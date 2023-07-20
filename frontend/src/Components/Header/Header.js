import './Header.css';
import Logo from '../../assets/images/logo.png'
import { Nav, Navbar,Dropdown} from "react-bootstrap"
import {Link} from 'react-router-dom'
import { MDBIcon } from 'mdb-react-ui-kit'
import { useAuth } from '../../store/authContext';
import toast from 'react-hot-toast';
import {  useEffect, useState } from 'react';
import axios from 'axios';
import Search from '../Search';
import { useCart } from '../../store/CartContext';
import { Badge} from 'antd'

function Header() {
 
  
const[auth,setAuth]=useAuth()
const[cart]=useCart()
const handleLogout=()=>{
setAuth({
  ...auth,
  user:null,
  token:''
})
localStorage.removeItem('auth')
toast.success('Logout Successfully')
}
//catergory
const [categories, setCategories] = useState([])
useEffect(() => {
  getAllCategory()
}, [])

const getAllCategory=async()=>{
  try {
    const {data}=await axios.get('/api/v1/category/get-category')
    if(data?.success){
      setCategories(data?.category)
    }
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong while loading category')
  }
}
return (
    <div className='navbar'>
    <Navbar
      collapseOnSelect
      expand="md"
      variant="light"
      className="shadow"
      fixed="top"
    >
      <Navbar.Brand className='ms-4 mb-2' ><Link to ='/'><img className='logo' src={Logo}alt='logo'/></Link></Navbar.Brand>
      <Navbar.Toggle className='toggler' aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse className='colapsed' id="responsive-navbar-nav">
      <Search/>
        <div className='ms-auto'>
        <Nav className="ms-2 me-2 ">
        <Link className='nav-li mt-2 pt-1 me-2' to='/'>Home</Link>
        {auth.user ?<div className='mt-2 me-2'> 
           <Dropdown>
            <Dropdown.Toggle className='a-link'>
          <MDBIcon  icon='user-alt' />
          </Dropdown.Toggle>
          <Dropdown.Menu >
          <Dropdown.Item className='drop-item' ><Link className='cat' to={`${auth?.user?.role ===1?'/admin':'/user/profile'}`}>Profile</Link></Dropdown.Item>
          {auth?.user?.role===0&& (<><Dropdown.Item className='drop-item' ><Link className='cat' to='/user/orders'>Orders</Link></Dropdown.Item>
          </>)}
          <Dropdown.Item className='drop-item'  onClick={handleLogout} ><Link className='cat' to='/login'>Logout<MDBIcon icon='sign-out-alt' size='lg'className='logout' /></Link></Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown></div>:
          <div className='ps-3 pt-2 mt-1'><Link className='nav-li' to='/login'>Login</Link></div>}
          {auth?.user?.role===0&&(<Badge className='mt-2 me-2 ' size='small' count={cart?.length} color='#656565' showZero>
          <Link className='nav-li' to='/user/cart'><MDBIcon className='pt-2 pb-2' icon='shopping-bag' /></Link>
    </Badge>)}
          {auth?.user?.role===1 ?'':
          <div className='mb-2'> 
          <Dropdown className='mt-1'><Dropdown.Toggle className='a-link'>Categories</Dropdown.Toggle>
          <Dropdown.Menu>{categories.map(c =>(<>
            <Dropdown.Item className='drop-item' key={c._id}><Link to={`/products/${c._id}`} className='cat'>{c.name}</Link></Dropdown.Item>
          </>))}   
          </Dropdown.Menu></Dropdown>
          </div>}
        </Nav>
        </div> 
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default Header;