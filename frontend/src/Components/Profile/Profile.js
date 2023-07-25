import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Modal } from "antd";
import "./Profile.css";
import { MDBBtn, MDBCol, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { useAuth } from "../../store/authContext";
import { Select } from "antd";
import  toast  from "react-hot-toast";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
const { Option } = Select;
function Profile() {
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [landmark, setLandmark] = useState('')
  const [state, setState] = useState('')
  const [address, setAddress] = useState('')
  useEffect(() => {
    const{name,phone,city,zip,landmark,state,address}=auth?.user
  setName(name)
  setPhone(phone)
  setCity(city)
  setZip(zip)
  setLandmark(landmark)
  setState(state)
  setAddress(address)
   
  }, [auth?.user])
  //update
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.put(`/api/v1/auth/profile/${auth.user._id}`,{
        name,
        phone,
        city:city,
        zip:zip,
        landmark:landmark,
        state:state,
        address:address
      })
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls=localStorage.getItem('auth')
        ls=JSON.parse(ls)
        ls.user =data.updatedUser
        localStorage.setItem("auth",JSON.stringify(ls))
        toast.success("Profile Updated successfully")
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  
  return (
   <>
   {!auth.user ? (<ThreeCircles
    height="100"
    width="100"
    color="#656565"
    wrapperStyle={{}}
    wrapperClass="justify-content-center align-items-center h-100"
    visible={true}
    ariaLabel="three-circles-rotating"
    outerCircleColor=""
    innerCircleColor=""
    middleCircleColor=""
  />):( <>
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
                    {auth.user.landmark ? auth.user.landmark : "NIL"}
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
      <form onSubmit={handleSubmit}>
        <div>
          <div className="text-center">
            <h3 className="head-t">Edit Details</h3>
          </div>
          <MDBInput placeholder="Full name" type="text" className="mb-4" value={name} onChange={(e)=>setName(e.target.value)} />
          <MDBInput
            placeholder="Mobile Number"
            type="text"
            className="mb-4"
            value={phone} onChange={(e)=>setPhone(e.target.value)}
          />
          <div className="row mb-4">
            <MDBCol>
              <MDBInput placeholder="City" type="text"
              value={city} onChange={(e)=>setCity(e.target.value)} />
            </MDBCol>
            <MDBCol>
              <MDBInput placeholder="Zip" type="text" 
              value={zip} onChange={(e)=>setZip(e.target.value)}/>
            </MDBCol>
          </div>
          <div className="row mb-4">
            <MDBCol>
              <MDBInput placeholder="Land Mark" type="text" 
              value={landmark} onChange={(e)=>setLandmark(e.target.value)}/>
            </MDBCol>
            <MDBCol>
              <Select
                bordered={false}
                placeholder="Select a state"
                className="form-control"
                size="small"
                onChange={(e)=>setState(e)}
              >
                <Option value="kerala">Kerala</Option>
              </Select>
            </MDBCol>
          </div>
          <MDBTextArea placeholder="Address" rows={3} className="mb-4" 
          value={address} onChange={(e)=>setAddress(e.target.value)}/>
        </div>
        <div>
          <MDBBtn className="btn-login" type="submit">Update details</MDBBtn>
        </div>
      </form>
    </Modal>
  </>)}</>
  );
}

export default Profile;
