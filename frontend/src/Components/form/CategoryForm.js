import React from 'react'
import './form.css'
import {
    MDBBtn,
    MDBIcon,
    MDBInput
  } from 'mdb-react-ui-kit';
const CategoryForm =({handleSubmit,value,setValue}) =>{
  return (
    <>
    <form onSubmit={handleSubmit}>
      <MDBInput wrapperClass='mb-2 mt-5' value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder='Enter New Category' type='text' />
      <MDBBtn className='btn-form' type='submit'><MDBIcon className='form-icon' fas icon='check' size="lg" /></MDBBtn>
      </form>
    </>
  )
}

export default CategoryForm
