import React from 'react'
import './form.css'
import {
    MDBBtn,
    MDBIcon,
    MDBInput
  } from 'mdb-react-ui-kit';
const CategoryForm =({handleSubmit,value,setValue,setPhoto,photo}) =>{
  return (
    <>
    <form onSubmit={handleSubmit}>
      <MDBInput wrapperClass='mb-2 mt-5' value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder='Enter New Category' type='text' />
      <div className='mb-3'>
      <label className='btn btn-outline-secondary col-md-12'>
        {photo ? photo.name:"Upload photo"}
    <input 
    type='file'
    name='photo'
    accept='image/*'
    onChange={(e)=>{setPhoto(e.target.files[0])}}  hidden />
    </label>
    </div>
    <div className='mb-3'>
        {photo && (
          <div>
            <img src={URL.createObjectURL(photo)} alt="https://assets.tatacliq.com/medias/sys_master/images/45446721241118.jpg" height={'100em'} className='img img-responsive' />
            </div>
        )}
    </div>
      <MDBBtn className='btn-form' type='submit'><MDBIcon className='form-icon' fas icon='check' size="lg" /></MDBBtn>
      </form>
    </>
  )
}

export default CategoryForm
