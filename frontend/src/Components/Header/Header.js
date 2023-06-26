import './Header.css';
import Logo from '../../assets/images/logo.png'
function Header() {
  
  return (
    <div className='navbar'>
      <img className='logo' src={Logo} alt='logo'/>
      <nav className='link'>
        
      </nav>
    </div>
  );
}

export default Header;