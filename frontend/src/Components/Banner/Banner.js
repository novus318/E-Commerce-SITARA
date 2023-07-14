import axios from 'axios';
import './Banner.css';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import toast from 'react-hot-toast';

function Banner() {
  const [index, setIndex] = useState(0);
const [banners, setBanners] = useState([])
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const getAllBanners=async()=>{
    try {
      const {data}=await axios.get('/api/v1/banner/get-banners')
      if(data?.success){
        setBanners(data?.banners)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong while loading Banners')
    }
  }
  useEffect(() => {
    getAllBanners()
  }, [])

  return (
    <div className='banner'>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {banners?.map(b =>(
        <Carousel.Item key={b._id}>
        <img
          className="d-block w-100"
          src={`http://localhost:8080/api/v1/banner/get-banner/${b._id}`}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      ))}
      </Carousel>
    </div>
  );
}

export default Banner;