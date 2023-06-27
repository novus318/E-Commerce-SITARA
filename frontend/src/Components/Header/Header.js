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
      className="shadow"
      fixed="top"
    >
      <Navbar.Brand className='ms-4 mb-2' ><img className='logo' src={Logo}alt='logo'/></Navbar.Brand>
      <Navbar.Toggle className='toggler' aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse className='colapsed' id="responsive-navbar-nav">
      <div className='ms-auto ps-3'>
      
  <input className='p-2 search' type="text"/>
  <i className="s fa fa-search"></i>

      </div>
        <div className='ms-auto'>
        <Nav className="ms-2 me-2 ">
          <div className='ps-3'><Nav.Link>Login</Nav.Link></div>
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