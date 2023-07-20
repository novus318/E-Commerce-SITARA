import { Link } from 'react-router-dom';
import './Categories.css';
import Card from 'react-bootstrap/Card';

function Categories({categories}) {
  
  
  return(
    <div className='categories'>
      <div className='text-center mt-3'>
        <h1 className='h t'>Categories</h1>
      </div>
      <div className='row container-fluid' >
      {categories.map(c =>(
      <Card className='mb-3' key={c._id}>
        <Link to={`/products/${c._id}`}>
      <Card.Img className='card-img' src={`/api/v1/category/category-photo/${c._id}`} alt="Card image" />
      <Card.ImgOverlay>
       <div className='card-title1 text-center'>
        <h3 className='t'>{c.name}</h3>
       </div>
      </Card.ImgOverlay>
      </Link>
    </Card>))}
      </div>
    </div>
  );
}

export default Categories;