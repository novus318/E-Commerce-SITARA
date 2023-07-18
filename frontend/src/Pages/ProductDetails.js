import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import { useParams } from 'react-router-dom'
import { ThreeCircles } from  'react-loader-spinner'
import axios from 'axios'
import "./AllProducts.css"

function ProductDetails() {
    const params=useParams()
    const [product, setProduct] = useState({})
     //get single product
  const getSingleProduct=async()=>{
    try {
        const {data}=await axios.get(`/api/v1/product/get-product/${params?.slug}`)
        setProduct(data?.product)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {

    if(params?.slug)getSingleProduct()
    //eslint-disable-next-line
  }, [params?.slug])
  return (
    <>
      <Header/>
     {product.name? (
           <div>
           <section className="py-5">
             <div className="container">
               <div className="row gx-5">
                 <aside className="col-lg-6">
                         <div className='mb-4'>      
                       <img style={{maxWidth: '100%', maxHeight: '100vh', margin: 'auto'}} className="rounded-4 fit img img-responsive" alt='pic' src={`/api/v1/product/product-photo/${product?._id}`} />
                       </div>
                   <div className="d-flex justify-content-center mb-3">
                     
                       <img width={60} height={60} className="rounded-2" alt='pic' src={`/api/v1/product/product-photo/${product._id}`} />
         
                       <img width={60} height={60} className="rounded-2" alt='pic' src={`/api/v1/product/product-photo/${product._id}`} />
                     
                     
                       <img width={60} height={60} className="rounded-2" alt='pic' src={`/api/v1/product/product-photo/${product._id}`} />
                     
                     
                       <img width={60} height={60} className="rounded-2" alt='pic' src={`/api/v1/product/product-photo/${product._id}`} />
                     
                     
                       <img width={60} height={60} className="rounded-2" alt='pic' src={`/api/v1/product/product-photo/${product._id}`} />
                     
                   </div>
                 </aside>
                 <main className="col-lg-6">
                   <div className="ps-lg-3">
                     <h2 className="head-t upper">
                     {product?.name}
                     </h2>
                     <div className="mb-3">
                       <span className="price">₹ {product?.price}</span>
                     </div>
                     <div className="mb-3">
                       <span className="category">category : {product?.category?.name}</span>
                     </div>
                     <h4 className='des'>
                     {product?.description}
                     </h4>
                     <hr />
                     <div className="row mb-4">
                       <div className="col-md-4 col-6">
                         <label className="mb-2">Size</label>
                         <select className="form-select border border-secondary" style={{height: 35}}>
                           <option>Small</option>
                           <option>Medium</option>
                           <option>Large</option>
                         </select>
                       </div>
                       <div className="col-md-4 col-6 mb-3">
                         <label className="mb-2 d-block">Quantity</label>
                         <div className="input-group mb-3" style={{width: 170}}>
                           <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                             <i className="fas fa-minus" />
                           </button>
                           <input type="text" className="form-control text-center border border-secondary" placeholder={14} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                           <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                             <i className="fas fa-plus" />
                           </button>
                         </div>
                       </div>
                     </div>
                     <button className="btn btn-warning shadow-0"> Buy now </button>
                     <button className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket" /> Add to cart </button>
                     <button className="btn btn-light border border-secondary py-2 icon-hover px-3"> <i className="me-1 fa fa-heart fa-lg" /> Save </button>
                   </div>
                 </main>
               </div>
             </div>
           </section>
              </div>
     ):(<ThreeCircles
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
      />)}
      
    </>
  )
}

export default ProductDetails
