import './AdminDashboard.css'
import React, { useEffect, useState } from 'react'
import MenuSidebar from './Sidebar'
import toast  from 'react-hot-toast'
import axios from 'axios'
import { MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit'
import CategoryForm from '../../Components/form/CategoryForm'
import {Modal} from 'antd'
import { ThreeCircles } from "react-loader-spinner";
function CreateCategory() {
  const [categories,setCategories] = useState([])
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState()
  const [photo, setPhoto] = useState('')
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updateName, setUpdateName] = useState('')
  const [updatePhoto, setUpdatePhoto] = useState('')
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try {
      const categoryData=new FormData()
      categoryData.append('name',updateName)
      updatePhoto && categoryData.append('photo',updatePhoto)
      const {data} =await axios.put(`/api/v1/category/update-category/${selected._id}`,categoryData)
      if(data?.success){
        toast.success(`${updateName} is updated`)
        setSelected(null)
        setUpdateName('')
        setUpdatePhoto ('')
        setVisible(false)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete=async(id)=>{
    try {
      setLoading(true)
      const {data} =await axios.delete(`/api/v1/category/delete-category/${id}`)
      if(data?.success){
        toast.success('Category is deleted')
        getAllCategory()
        setLoading(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const categoryData=new FormData()
      categoryData.append('name',name)
      categoryData.append('photo',photo)
      const {data}=await axios.post('/api/v1/category/create-category',categoryData)
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory()
        window.location.reload()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
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
        setCategories(data?.category)
        setLoading(false)
      }
    } catch (error) {
      toast.error('Something went wrong while loading category')
    }
  }
  return (
   <>
   {loading ? (  <ThreeCircles
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
      <div className="d-flex">
        <MenuSidebar/>
    <div className="m-auto text-center">
    <h1 className='head-t mt-4'>Manage Category</h1>
    <div>
      <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} setPhoto={setPhoto} photo={photo}/>
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
    <form onSubmit={handleUpdate}>
      <MDBInput wrapperClass='mb-2 mt-5' value={updateName} onChange={(e)=>{setUpdateName(e.target.value)}} placeholder='Enter New Category' type='text' />
      <div className='mb-3'>
      <label className='btn btn-outline-secondary col-md-12'>
        {photo ? photo.name:"Upload photo"}
    <input 
    type='file'
    name='photo'
    accept='image/*'
    onChange={(e)=>{setUpdatePhoto(e.target.files[0])}}  hidden />
    </label>
    </div>
    <div className='mb-3'>
    <div className='mb-3'>
        {updatePhoto ? (
          <div>
            <img src={URL.createObjectURL(updatePhoto)} alt='catagory' height={'100em'} className='img img-responsive' />
            </div>
        ):(
            <div>
              <img src={`/api/v1/category/category-photo/${selected?._id}`} alt='category' height={'100em'} className='img img-responsive' />
              </div>
          )}
    </div>
    </div>
      <MDBBtn className='btn-form' type='submit'><MDBIcon className='form-icon' fas icon='check' size="lg" /></MDBBtn>
      </form>
    </Modal>
    </div>
    </div>
    </>)}</>
  )
}

export default CreateCategory
