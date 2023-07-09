import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { MDBBtn,MDBIcon } from 'mdb-react-ui-kit'
import './AdminDashboard.css'
import { Link } from 'react-router-dom'
function MenuSidebar() {
    const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div className="position-fixed h-100">
    <Sidebar collapsed={collapsed} transitionDuration={800}>
 <Menu>
 <MDBBtn className='col-12 s-btn' onClick={() => setCollapsed(!collapsed)}>
           |=
         </MDBBtn>
         <Link to='/admin'><MenuItem icon={<MDBIcon className='fas' fas icon='home' size="lg" />}>Home</MenuItem></Link>
         <Link to='/admin/create-category'><MenuItem icon={<MDBIcon className='fas' fas icon='th-large' size="lg" />}>Create Category</MenuItem></Link>
         <Link to='/admin/create-product'><MenuItem icon={<MDBIcon className='fas' fas icon='box-open' size="lg" />}>Create Product</MenuItem></Link>
         <Link to='/admin/users'><MenuItem icon={<MDBIcon className='fas' fas icon='user-cog' size="lg" />}>Users</MenuItem></Link>
         <Link to='/admin/orders'><MenuItem icon={<MDBIcon className='fas' fas icon='clipboard-list' size="lg" />}>Orders</MenuItem></Link>
 </Menu>
</Sidebar>
   </div>
  )
}

export default MenuSidebar
