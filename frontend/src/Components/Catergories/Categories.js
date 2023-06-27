import './Categories.css';
import Card from 'react-bootstrap/Card';
function Categories() {

  return(
    <div className='categories'>
      <div className='text-center mt-3'>
        <h1 className='h t'>Categories</h1>
      </div>
      <div className='row container-fluid' >
      <Card className='mb-3'>
      <Card.Img className='card-img' src="https://assets.tatacliq.com/medias/sys_master/images/47374511112222.jpg" alt="Card image" />
      <Card.ImgOverlay>
       <div className='card-title text-center'>
        <h3 className='t'>KURti</h3>
       </div>
      </Card.ImgOverlay>
    </Card>
    <Card className='mb-3'>
      <Card.Img className='card-img' src="https://assets.tatacliq.com/medias/sys_master/images/47374511177758.jpg" alt="Card image" />
      <Card.ImgOverlay>
       <div className='card-title text-center'>
        <h3 className='t'>KURti</h3>
       </div>
      </Card.ImgOverlay>
    </Card>
    <Card className='mb-3'>
      <Card.Img className='card-img' src="https://assets.tatacliq.com/medias/sys_master/images/47374508195870.jpg" alt="Card image" />
      <Card.ImgOverlay>
       <div className='card-title text-center'>
        <h3 className='t'>KURti</h3>
       </div>
      </Card.ImgOverlay>
    </Card>
    <Card className='mb-3'>
      <Card.Img className='card-img' src="https://assets.tatacliq.com/medias/sys_master/images/47374508130334.jpg" alt="Card image" />
      <Card.ImgOverlay>
       <div className='card-title text-center'>
        <h3 className='t'>KURti</h3>
       </div>
      </Card.ImgOverlay>
    </Card>
    <Card className='mb-3'>
      <Card.Img className='card-img' src="https://assets.tatacliq.com/medias/sys_master/images/47374508064798.jpg" alt="Card image" />
      <Card.ImgOverlay>
       <div className='card-title text-center'>
        <h3 className='t'>KURti</h3>
       </div>
      </Card.ImgOverlay>
    </Card>
      </div>
    </div>
  );
}

export default Categories;