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