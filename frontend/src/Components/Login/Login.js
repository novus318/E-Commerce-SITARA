import React,{ useContext, useState } from 'react';
import './Login.css';
import { useGoogleLogin } from '@react-oauth/google';
import { FbAppId } from '../../api credentials/Api'

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import {  UserContext } from '../../store/userContext';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../../store/authContext';
import { ThreeCircles } from "react-loader-spinner";
function Login() {
  const [loading, setLoading] = useState(false);
  const [justifyActive, setJustifyActive] = useState('login');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [email2, setEmail2] = useState('')
  const [password2, setPassword2] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [question, setQuestion] = useState('')
  const navigate = useNavigate()
  const[auth,setAuth]=useAuth()
  const location=useLocation()
  const handleLogin=async(e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      const res=await axios.post('/api/v1/auth/login',{
        email2,password2
      })
      if(res &&res.data.success){
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate(location.state ||'/')
      }else{
        toast.error(res.data.message)
      }
    }
    catch(e){
      console.log(e)
      toast.error('something went wrong')
    }
   
     
  }
  const handleSignup=async(e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      const res=await axios.post('/api/v1/auth/signup',{name,email,password,phone,question})
      if(res &&res.data.success){
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate(location.state ||'/')
      }else{
        toast.error(res.data.message)
      }
    }
    catch(e){
      console.log(e)
      toast.error('something went wrong')
    }
  }
  const { setUser } = useContext(UserContext)
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse)
      toast.success('LoggedIn Successfully')
      navigate('/')
    },
    onError: (error) => 
    toast.error('something went wrong')
  });
  const responseFacebook = (response) => {
    console.log(response);
    navigate('/')
  }
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  }
  return (
    <>
    {loading?( <ThreeCircles
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
        />):(<div>
      <MDBContainer className="p-3 my-5 d-flex flex-column col-md-6 col-12">

        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('login')} active={justifyActive === 'login'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('signUp')} active={justifyActive === 'signUp'}>
              SignUp
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>

          <MDBTabsPane show={justifyActive === 'login'}>
            <div className="text-center mb-3">
              <p>Login with:</p>
              <div className='d-flex justify-content-between mx-auto mb-5'>

                <FacebookLogin
                  appId={FbAppId}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <MDBBtn tag='a' color='none' className='m-1 m-auto me-4' onClick={renderProps.onClick}>
                      <MDBIcon fab icon='facebook-f' size="2x" />
                    </MDBBtn>
                  )}
                />
                <MDBBtn onClick={() => login()} tag='a' color='none' className='m-1 m-auto'>
                  <MDBIcon fab icon='google' size="2x" />
                </MDBBtn>
              </div>
            </div>
            <form className='text-center' action='POST' onSubmit={handleLogin}>
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setEmail2(e.target.value)}} placeholder='E-mail address' type='email' />
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setPassword2(e.target.value)}} placeholder='Password' type='password' />

              <div className="d-flex mx-4 mb-4">
                <Link to='/forgot-password'>Forgot ?</Link>
              </div>
              <MDBBtn className='btn-login col-12'>Login</MDBBtn>
            </form>
            <p className="text-center">Not a member? <span className='register' onClick={() => handleJustifyClick('signUp')} active={justifyActive === 'signUp'}>Register</span></p>

          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === 'signUp'}>

            <div className="text-center mb-3">
              <p>Sign un with:</p>
              <div className='d-flex justify-content-between mx-auto mb-4'>

                <FacebookLogin
                  appId={FbAppId}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <MDBBtn tag='a' color='none' className='m-1 m-auto me-4' onClick={renderProps.onClick}>
                      <MDBIcon fab icon='facebook-f' size="2x" />
                    </MDBBtn>
                  )}
                />
                <MDBBtn onClick={() => login()} tag='a' color='none' className='m-1 m-auto'>
                  <MDBIcon fab icon='google' size="2x" />
                </MDBBtn>
              </div>

            </div>
            <form action='POST' onSubmit={handleSignup}>
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setName(e.target.value)}} placeholder='Name' type='text' />
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' type='email' />
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' type='password' />
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setPhone(e.target.value)}} placeholder='Phone number' type='tel' />
              <MDBInput wrapperClass='mb-2' onChange={(e)=>{setQuestion(e.target.value)}} placeholder='Your Favorite person ?' type='text' />
              <div className='mb-4'>
                <p>* Do not forget the answer you can't reset your Password</p>
                <MDBCheckbox name='flexCheck' label='I have read and agree to the terms' />
                
              </div>

              <MDBBtn className="mb-4 w-100 btn-login">Sign up</MDBBtn>
            </form>
            <p className="text-center">Already a member? <span className='register' onClick={() => handleJustifyClick('login')} active={justifyActive === 'login'}>Login</span></p>
          </MDBTabsPane>

        </MDBTabsContent>

      </MDBContainer>
    </div>)}</>
  );
}

export default Login;