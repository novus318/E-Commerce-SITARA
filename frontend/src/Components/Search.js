import React from 'react'
import '../Components/Header/Header.css';
import { useSearch } from '../store/SearchContext';
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Search() {
 const [search,setSearch]=useSearch()
 const navigate=useNavigate()
 const handleSearch=async(e)=>{
 e.preventDefault()
  try {
    const {data} =await axios.get(`/api/v1/product/search/${search.keyword}`)
    setSearch({...search, results: data})
    navigate('/search')
  } catch (error) {
    toast.error('Unable to search')
  }
 } 
 return (
    <>
      <div className='ms-auto ps-3'>
      <form className='d-flex input-group w-auto container-fluid' onSubmit={handleSearch}>
        
      <input type='search' value={search.keyword} onChange={
        (e)=>setSearch({...search,keyword:e.target.value})
      } className='form-control srch' placeholder='Find your needs' aria-label='Search' />

      <button className='s ps-2' type='submit'><MDBIcon className='fas' fas icon='search' size="lg" /></button>
      </form>
          </div>
    </>
  )
}

export default Search
