import './Banner.css';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
function Banner({banners}) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  
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