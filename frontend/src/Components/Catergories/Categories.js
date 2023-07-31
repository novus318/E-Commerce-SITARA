import React,{ Link } from 'react-router-dom';
import './Categories.css';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Categories() {
   const [categories, setCategories] = useState([]);
    //get all category

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Something went wrong while loading category");
    }
  };
   useEffect(() => {
    getAllCategory();
    // eslint-disable-next-line
  }, []);
  return(
    <div className='categories'>
      <div className='text-center mt-3'>
        <h1 className='h t'>Categories</h1>
      </div>
      <div className='row container-fluid' >
      {categories.map(c =>(
      <Card className='mb-3 col-6 col-md-3 col-lg-2' key={c._id}>
        <Link to={`/products/${c._id}`}>
      <Card.Img className='card-img img-fluid' src={`/api/v1/category/category-photo/${c._id}`} alt="Card image" />
      </Link>
    </Card>))}
      </div>
    </div>
  );
}

export default Categories;