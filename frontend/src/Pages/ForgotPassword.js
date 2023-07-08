import React, { useState } from 'react'
import {
    MDBBtn,
    MDBInput
  } from 'mdb-react-ui-kit';
  import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [question, setQuestion] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()
    const handleForgot = async(e)=>{
        e.preventDefault()
        try{
          const res=await axios.post('/api/v1/auth/forgot-password',{
        email,question,newPassword
          })
          if(res &&res.data.success){
            toast.success(res.data.message)
            navigate('/login')
          }else{
            toast.error(res.data.message)
          }
        }

        catch(e){
          console.log(e)
          toast.error('something went wrong')
        }
    }
       
  return (
    <div className='col-7 m-auto mt-5 pt-5'>
       <form className='text-center' onSubmit={handleForgot} action='POST'>
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setEmail(e.target.value)}} placeholder='E-mail address' type='email' />
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setQuestion(e.target.value)}} placeholder='Your Favorite person ?' type='text' />
              <MDBInput wrapperClass='mb-4' onChange={(e)=>{setNewPassword(e.target.value)}} placeholder='New Password' type='password' />

              
              <MDBBtn className='btn-login col-12'>Reset</MDBBtn>
            </form>
    </div>
  )
}

export default ForgotPassword;
