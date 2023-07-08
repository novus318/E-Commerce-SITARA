import './Header.css';
import Logo from '../../assets/images/logo.png'
import { Nav, Navbar,Dropdown} from "react-bootstrap"
import {Link} from 'react-router-dom'
import { MDBIcon } from 'mdb-react-ui-kit'
import { useAuth } from '../../store/authContext';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../../store/userContext';

function Header() {
  const {profile}=useContext(UserContext)
  
const[auth,setAuth]=useAuth()
const handleLogout=()=>{
setAuth({
  ...auth,
  user:null,
  token:''
})
localStorage.removeItem('auth')
toast.success('Logout Successfully')
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
      <div className='ms-auto ps-3'>
      
  <input className='p-2 search' type="text"/>
  <i className="s fa fa-search"></i>

      </div>
        <div className='ms-auto'>
        <Nav className="ms-2 me-2 ">
        {auth.user ?<div className='ps-3 me-3'> 
           <Dropdown>
            <Dropdown.Toggle>
          <MDBIcon className='pt-3 pb-3' icon='user-alt' size='lg' />
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item className='profile' ><Link className='a-link' to='/'>Home</Link></Dropdown.Item>
          <Dropdown.Item className='profile' ><Link className='a-link' to={`${auth?.user?.role ===1?'/admin':'/profile'}`}>Profile</Link></Dropdown.Item>
          <Dropdown.Item onClick={handleLogout} ><Link to='/login'><MDBIcon icon='sign-out-alt' size='lg'className='logout' /></Link></Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown></div>:
          <div className='ps-3 pt-2'><Link className='a-link' to='/login'>Login</Link></div>}
          <div className='mb-2'> 
          <Dropdown><Dropdown.Toggle>Categories</Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item>Item1</Dropdown.Item>
          <Dropdown.Item>Item2</Dropdown.Item>
          <Dropdown.Item>Item3</Dropdown.Item>
          <Dropdown.Item>Item4</Dropdown.Item>
          <Dropdown.Item>Item5</Dropdown.Item>
          </Dropdown.Menu></Dropdown>
          </div>
        </Nav>
        </div> 
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default Header;