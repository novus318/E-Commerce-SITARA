import './AdminDashboard.css'
import React, { useEffect, useState } from 'react'
import MenuSidebar from './Sidebar'
import toast  from 'react-hot-toast'
import axios from 'axios'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit'
import CategoryForm from '../../Components/form/CategoryForm'
import {Modal} from 'antd'
function CreateCategory() {
  const [categories,setCategories] = useState([])
  const [name, setName] = useState()
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updateName, setUpdateName] = useState('')
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try {
      const {data} =await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updateName})
      if(data?.success){
        toast.success(`${updateName} is updated`)
        setSelected(null)
        setUpdateName('')
        setVisible(false)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  const handleDelete=async(id)=>{
    try {
      const {data} =await axios.delete(`/api/v1/category/delete-category/${id}`)
      if(data?.success){
        toast.success('Category is deleted')
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.post('/api/v1/category/create-category',{name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong on creating')
    }
  }
  useEffect(() => {
    getAllCategory()
  }, [])
  
  const getAllCategory=async()=>{
    try {
      const {data}=await axios.get('/api/v1/category/get-category')
      if(data?.success){
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong while loading category')
    }
  }
  return (
    <>
      <div className="d-flex">
        <MenuSidebar/>
    <div className="m-auto text-center">
    <h1 className='head-t mt-4'>Manage Category</h1>
    <div>
      <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
    </div>
    <div>
   <table className="table">
  <thead className='head'>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories?.map(c =>(
      <>
      <tr>
      <td className='name pt-3' key={c._id}>{c.name}</td>
      <td><MDBBtn className='action-btn' onClick={()=>{setVisible(true);setUpdateName(c.name);
      setSelected(c)
      }}><MDBIcon className='action-icon' fas icon='pen' size="sm" /> edit</MDBBtn>
      <MDBBtn 
      onClick={()=>{handleDelete(c._id)}}
      className='action-btn ms-2'><MDBIcon className='action-icon' fas icon='trash' size="sm" /> delete</MDBBtn>
      </td>
    </tr>
    </>
    ))}
    
  </tbody>
</table>

    </div>
    <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
      <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate}/>
    </Modal>
    </div>
    </div>
    </>
  )
}

export default CreateCategory
