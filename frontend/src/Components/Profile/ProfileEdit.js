import React from 'react'
import {
    MDBInput,
    MDBBtn
  } from 'mdb-react-ui-kit';
function ProfileEdit() {
  return (
    <div>
      <div className="row gutters-sm mt-5">
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
              <img src="https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg" alt="Admin" className="rounded-circle" width={150} />
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Full Name</h6>
              </div>
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setName(e.target.value)}} placeholder='Name' type='text' />
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' type='email' />
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Phone</h6>
              </div>
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setPhone(e.target.value)}} placeholder='Phone' type='tel' />
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Address</h6>
              </div>
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Address' type='text' />
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-12">
              <MDBBtn className='btn-login col-2 p-1'>Save</MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div></div>
    </div>
  )
}

export default ProfileEdit
