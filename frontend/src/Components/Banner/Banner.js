import axios from 'axios';
import toast from 'react-hot-toast';
import './Banner.css';
import React,{ useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
function Banner() {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
    //banners
    const getAllBanners = async () => {
      try {
  
        const { data } = await axios.get("/api/v1/banner/get-banners");
        if (data?.success) {
          setBanners(data?.banners)
        }
      } catch (error) {
        toast.error("Something went wrong while loading Banners");
      }
    };
      useEffect(() => {
    getAllBanners()
    // eslint-disable-next-line
  }, []);
  
  return (
  <div className='banner'>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {banners?.map(b =>(
        <Carousel.Item key={b._id}>
        <img
          className="d-block w-100"
          src={`http://localhost:8080/api/v1/banner/get-banner/${b._id}`}
          alt='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzZzaWk4bzRjcjdtaWJjbW0wZHE5MmR2dmZrMGo4dDh2em12ZHd6MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/menFT88W603HCfdSaG/giphy.gif'
        />
      </Carousel.Item>
      ))}
      </Carousel>
    </div>
  );
}

export default Banner;