import React, { useState } from "react";
import Header from "../Header/Header";
import { Modal } from "antd";
import "./Profile.css";
import { MDBBtn, MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { useAuth } from "../../store/authContext";
import { Select } from "antd";
const { Option } = Select;
function Profile() {
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="container-fluid">
        <div>
          <Header />
          <div className="row gutters-sm mt-5">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg"
                      alt="Admin"
                      className="rounded-circle"
                      width={100}
                    />
                    <div className="mt-3">
                      <h4 className="head-t upper">{auth?.user?.name}</h4>
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
                    <div className="col-sm-9 font-d">{auth?.user?.name}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 font-d">{auth?.user?.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 font-d">
                      +91 {auth?.user?.phone}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">City</h6>
                    </div>
                    <div className="col-sm-9 font-d">
                      {auth.user.city ? auth.user.city : "NIL"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Zip</h6>
                    </div>
                    <div className="col-sm-9 font-d">
                      {auth.user.zip ? auth.user.zip : "NIL"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Land Mark</h6>
                    </div>
                    <div className="col-sm-9 font-d">
                      {auth.user.land ? auth.user.land : "NIL"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">State</h6>
                    </div>
                    <div className="col-sm-9 font-d ">
                      {auth.user.state ? auth.user.state : "NIL"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 font-d">
                      {auth.user.address ? auth.user.address : "NIL"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <MDBBtn
                        onClick={() => {
                          setVisible(true);
                        }}
                        className="btn-login col-2 p-1"
                      >
                        Edit
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
        <form>
          <div>
            <div className="text-center">
              <h3 className="head-t">Edit Details</h3>
            </div>
            <MDBInput placeholder="Full name" type="text" className="mb-4" />
            <MDBInput
              placeholder="Mobile Number"
              type="text"
              className="mb-4"
            />
            <div className="row mb-4">
              <MDBCol>
                <MDBInput placeholder="City" type="text" />
              </MDBCol>
              <MDBCol>
                <MDBInput placeholder="Zip" type="text" />
              </MDBCol>
            </div>
            <div className="row mb-4">
              <MDBCol>
                <MDBInput placeholder="Land Mark" type="text" />
              </MDBCol>
              <MDBCol>
                <Select
                  bordered={false}
                  placeholder="Select a state"
                  className="form-control"
                  size="small"
                >
                  <Option value="0">Kerala</Option>
                </Select>
              </MDBCol>
            </div>
            <MDBTextArea placeholder="Address" rows={3} className="mb-4" />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Profile;
