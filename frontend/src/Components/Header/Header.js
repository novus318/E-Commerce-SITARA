import './Header.css';
import Logo from '../../assets/images/logo.png'
import { Nav, Navbar,Dropdown } from "react-bootstrap"
function Header() {

  return (
    <div className='navbar'>
    <Navbar
      collapseOnSelect
      expand="md"
      variant="light"
      className="shadow-sm"
      fixed="top"
    >
      <Navbar.Brand className='ms-4' ><img className='logo' src={Logo}alt='logo'/></Navbar.Brand>
      <Navbar.Toggle className='toggler' aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse className='colapsed' id="responsive-navbar-nav">
        <div className='ms-auto'>
        <Nav className="ms-2 me-2 ">
          <Nav.Link>Login</Nav.Link>
          <Dropdown><Dropdown.Toggle>afa</Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item>Item</Dropdown.Item>  
            
          </Dropdown.Menu></Dropdown>
          <Nav.Link>Products</Nav.Link>
        </Nav>
        </div> 
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default Header;