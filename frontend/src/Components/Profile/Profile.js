import React from 'react'
import Header from '../Header/Header'
import {
  MDBBtn
} from 'mdb-react-ui-kit';
function Profile() {
  return (
    <div>
      <div className="container">
  <div className="main-body">
  <Header />
    <div className="row gutters-sm mt-5">
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
              <img src="https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg" alt="Admin" className="rounded-circle" width={150} />
              <div className="mt-3">
                <h4>John Doe</h4>
                <p className="text-secondary mb-1">Full Stack Developer</p>
                <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
              </div>
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
              <div className="col-sm-9 text-secondary">
                Kenneth Valdez
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                fip@jukmuh.al
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Phone</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                (239) 816-9029
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Address</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                Bay Area, San Francisco, CA
                Bay Area, San Francisco, CA
                Bay Area, San Francisco, CA
                Bay Area, San Francisco, CA
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-12">
              <MDBBtn className='btn-login col-2 p-1'>edit</MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div></div></div></div>

    </div>
  )
}

export default Profile
