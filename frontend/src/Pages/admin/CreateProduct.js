import './AdminDashboard.css'
import React, { useEffect, useState } from 'react'
import MenuSidebar from './Sidebar'
import axios from 'axios'
import toast  from 'react-hot-toast'
import {Select} from 'antd'
import { MDBBtn, MDBInput,MDBTextArea } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
const {Option}=Select
function CreateProduct() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [photo, setPhoto] = useState('')
  const navigate=useNavigate()
  //Create product
  const handleCreate=async(e)=>{
    e.preventDefault()
    try {
      const productData=new FormData()
      productData.append('name',name)
      productData.append('description',description)
      productData.append('price',price)
      productData.append('category',category)
      productData.append('quantity',quantity)
      productData.append('photo',photo)
      const {data}=await axios.post('/api/v1/product/create-product',productData)
      if(data?.success ===false){
        toast.error(data?.message)
      }else{
        toast.success('Product created Successfully')
        navigate('/admin/products')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
//get all category
const getAllCategory=async()=>{
  try {
    const {data}=await axios.get('/api/v1/category/get-category')
    if(data?.success){
      setCategories(data?.category)
    }
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong while loading category')
  }
}
useEffect(() => {
  getAllCategory()
}, [])


  return (
    <>
    <div className="d-flex">
      <MenuSidebar/>
  <div className="m-auto col-7 text-center">
  <h1 className='head-t mt-3 '>Create Product</h1>
    <div>
    <Select bordered={false} placeholder='Select a category' size='large' className='form-select-sm mb-3'
    onChange={(value)=>{setCategory(value)}}
    >
      {categories?.map(c =>(
        <Option key={c._id} value={c._id}>{c.name}</Option>
      ))}
    </Select>
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
            <img src={URL.createObjectURL(photo)} alt="product photo" height={'100em'} className='img img-responsive' />
            </div>
        )}
    </div>
    <div className="mb-3">
    <MDBInput wrapperClass='mb-2' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter a Name' type='text' />
    <MDBTextArea wrapperClass='mb-2' value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Enter a Description' type='text' />
    <MDBInput wrapperClass='mb-2' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Enter a Price' type='number' />
    <MDBInput wrapperClass='mb-2' value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} placeholder='Enter a Quantity' type='number' />
    <Select bordered={true} placeholder='Select a Shipping' size='large' className='form-select-sm w-50 mb-3'
    onChange={(value)=>{setShipping(value)}}
    >
      <Option value='0'>No</Option>
      <Option value='1'>Yes</Option>
    </Select>
    </div>
    <div>
      <MDBBtn className='form-btn' onClick={handleCreate}>Create Product</MDBBtn>
    </div>
  </div>
  </div>
  </div>
  </>
  )
}

export default CreateProduct
