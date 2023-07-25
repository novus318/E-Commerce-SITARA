import React from 'react'
import { Link } from 'react-router-dom'
import { useSearch } from '../store/SearchContext'
import Header from '../Components/Header/Header'
import { ThreeCircles } from "react-loader-spinner";
function SearchProducts() {
    const [search]=useSearch()
  return (
    <>
    {!search ? (<ThreeCircles
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
        />):(<>
    <Header/>
      <div className="m-auto col-7 text-center">
  <h4 className='head-t mt-3'>Results: {search?.results?.length} Products</h4>
    <div className='row container justify-content-center'>
        {search?.results?.map(p =>(
           
            <div className="product-card mb-3">
           <Link key={p._id} to={`/product/${p.slug}`}>
            <div className="product-tumb">
                <img className='p-img' src={`http://localhost:8080/api/v1/product/product-photo1/${p._id}`} alt={p.name}/>
            </div>
            <div className="product-details">
                <div className='p-head'>{p.name}</div>
                <p>{p.description.substring(0,40)}...</p>
                <div className="product-bottom-details">
            <div className="product-price">₹ {p.price}</div>
                </div>
            </div>
            </Link>
        </div> 
        ))}      
    </div>

  </div>
    </>)}</>
  )
}

export default SearchProducts
