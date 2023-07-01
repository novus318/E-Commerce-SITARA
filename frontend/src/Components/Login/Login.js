import { useContext, useState } from 'react';
import './Login.css';
import {useGoogleLogin} from '@react-oauth/google';

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
import { UserContext } from '../../store/userContext';
import FacebookLogin from 'react-facebook-login'

function Login() {
  const [justifyActive, setJustifyActive] = useState('login');
  const {setUser} = useContext(UserContext)
  console.log(setUser)
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});

const responseFacebook = (response) => {
  console.log(response);
}
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  }
  return (
    <div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

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
            <div className='d-flex justify-content-between mx-auto'style={{width: '25%'}}>
              
              <FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    render={(renderProps) => (
      <MDBBtn tag='a' color='none' className='m-1' onClick={renderProps.onClick}>
        <MDBIcon fab icon='facebook-f' size="lg" />
      </MDBBtn>
    )}
  />
              

              <MDBBtn onClick={() => login()} tag='a' color='none' className='m-1'>
              <MDBIcon fab icon='google' size="lg" />
              </MDBBtn>
            </div>
          </div>
          <form className='text-center'>
          <MDBInput wrapperClass='mb-4' placeholder='E-mail address'  id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password'/>

          <div className="d-flex mx-4 mb-4">
            <a href="!#">Forgot ?</a>
          </div>
          <MDBBtn className='btn-login col-6'>Login</MDBBtn>
          </form>
          <p className="text-center">Not a member? <span className='register' onClick={() => handleJustifyClick('signUp')} active={justifyActive === 'signUp'}>Register</span></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'signUp'}>

          <div className="text-center mb-3">
            <p>Sign un with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '25%'}}>
              <MDBBtn tag='a' color='none' className='m-1'>
                <MDBIcon fab icon='facebook-f' size="lg"/>
              </MDBBtn>

              <MDBBtn onClick={() => login()} tag='a' color='none' className='m-1' >
                <MDBIcon fab icon='google' size="gl"/>
              </MDBBtn>
            </div>
          </div>
        <form>
          <MDBInput wrapperClass='mb-4' placeholder='Name'  type='text'/>
          <MDBInput wrapperClass='mb-4' placeholder='Username' type='text'/>
          <MDBInput wrapperClass='mb-4' placeholder='Email' type='email'/>
          <MDBInput wrapperClass='mb-4' placeholder='Password' type='password'/>

          <div className='d-flex mb-4'>
            <MDBCheckbox name='flexCheck' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100 btn-login">Sign up</MDBBtn>
          </form>
          <p className="text-center">Already a member? <span className='register' onClick={() => handleJustifyClick('login')} active={justifyActive === 'login'}>Login</span></p>
        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
    </div>
  );
}

export default Login;