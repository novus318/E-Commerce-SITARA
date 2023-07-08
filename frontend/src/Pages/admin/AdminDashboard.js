import { MDBBtn,MDBIcon } from 'mdb-react-ui-kit'
import './AdminDashboard.css'
import Logo from '../../assets/images/logo.png'
import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
function AdminDashboard() {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <>
      <div className="d-flex">
        <div className="position-fixed h-100">
     <Sidebar collapsed={collapsed} transitionDuration={800}>
  <Menu>
  <MDBBtn className='col-12 s-btn' onClick={() => setCollapsed(!collapsed)}>
            |=
          </MDBBtn>
    <MenuItem icon={<MDBIcon className='fas' fas icon='th-large' size="lg" />}><Link to='/admin/create-category'>Create Category</Link></MenuItem>
    <MenuItem icon={<MDBIcon className='fas' fas icon='box-open' size="lg" />}><Link to='/admin/create-product'>Create Product</Link></MenuItem>
    <MenuItem icon={<MDBIcon className='fas' fas icon='user-cog' size="lg" />}><Link to='/admin/users'>Users</Link></MenuItem>
    <MenuItem icon={<MDBIcon className='fas' fab icon='facebook-f' size="lg" />}><Link to='/admin/create-category'>Create Category</Link></MenuItem>
  </Menu>
</Sidebar>
    </div>
    <div className="m-auto text-center">
    <Link to ='/'><img className='log' src={Logo}alt='logo'/></Link>
      <h1 className='head-t'>Admin panel</h1>


    </div>
    </div>
    </>
  )
}

export default AdminDashboard
