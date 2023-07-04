import React from 'react'
import './PageNot.css'
import { Link } from 'react-router-dom'
function PageNot() {
  return (
    <div className='pnf'>
      <h1 className='pnf-title'>404</h1>
      <h2 className='pnf-head'>Oops ! Page Not Found</h2>
      <Link to='/' className='pnf-btn'>Go Back</Link>
    </div>
  )
}

export default PageNot
