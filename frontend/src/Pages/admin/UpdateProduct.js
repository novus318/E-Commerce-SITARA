import './AdminDashboard.css'
import React, { useEffect, useState } from 'react'
import MenuSidebar from './Sidebar'
import axios from 'axios'
import toast  from 'react-hot-toast'
import {Select} from 'antd'
import { MDBBtn, MDBInput,MDBTextArea } from 'mdb-react-ui-kit'
import { useNavigate, useParams } from 'react-router-dom'
const {Option}=Select
function UpdateProduct() {
    const [id, setId] = useState('')
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [photo, setPhoto] = useState('')
  const navigate=useNavigate()
  const params=useParams()
  //Create product
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try {
      const productData=new FormData()
      productData.append('name',name)
      productData.append('description',description)
      productData.append('price',price)
      productData.append('category',category)
      productData.append('quantity',quantity)
      photo && productData.append('photo',photo)
      const {data}=await axios.put(`/api/v1/product/update-product/${id}`,productData)
      if(data?.success ===false){
        toast.error(data?.message)
      }else{
        toast.success('Product updated Successfully')
        navigate('/admin/products')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  //get single product
  const getSingleProduct=async()=>{
    try {
        const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`)
        setName(data.product.name)
        setId(data.product._id)
        setDescription(data.product.description)
        setPrice(data.product.price)
        setCategory(data.product.category._id)
        setQuantity(data.product.quantity)
        setName(data.product.name)
        setShipping(data.product.shipping)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getSingleProduct()
    //eslint-disable-next-line
  }, [])
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
//delete product
const handleDelete =async()=>{
    try {
        let answer=window.confirm('Are you sure to delete the product')
        if(!answer)return
        const {data}=await axios.delete(`/api/v1/product/delete-product/${id}`)
        if(data?.success){
        toast.success('Product deleted successfully')
        navigate("/admin/products")
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
    }
}

  return (
    <>
    <div className="d-flex">
      <MenuSidebar/>
  <div className="m-auto col-7 text-center">
  <h1 className='head-t mt-3 '>Update Product</h1>
    <div>
    <Select bordered={false} placeholder='Select a category' size='large' className='form-select-sm mb-3'
    onChange={(value)=>{setCategory(value)}}
    value={category}
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
        {photo ? (
          <div>
            <img src={URL.createObjectURL(photo)} alt={name} height={'100em'} className='img img-responsive' />
            </div>
        ):(
            <div>
              <img src={`http://localhost:8080/api/v1/product/product-photo/${id}`} alt={name} height={'100em'} className='img img-responsive' />
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
    value={shipping? 'Yes':'No'}
    >
      <Option value='0'>No</Option>
      <Option value='1'>Yes</Option>
    </Select>
    </div>
    <div className='mb-3'>
      <MDBBtn className='update-btn' onClick={handleUpdate}>Update Product</MDBBtn>
    </div>
    <div className='mb-5'>
      <MDBBtn className='delete-btn ' onClick={handleDelete}>Delete Product</MDBBtn>
    </div>
  </div>
  </div>
  </div>
  </>
  )
}

export default UpdateProduct
