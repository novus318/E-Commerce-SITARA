import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from 'react-bootstrap/Card'
import './Recomendation.css'

function Recomendation() {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 3000, min: 1500 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1500, min: 800 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      }
  return (
    <div className='mt-4'>
      <div className='text-center mb-5'>
        <h2>Recommended</h2>
      </div>
      <div>
      <Carousel responsive={responsive}>
  <div className='p-card'>
  <Card className='p-card m-auto'>
      <Card.Img className='p-image' variant="top" src="https://img.tatacliq.com/images/i8/437Wx649H/MP000000014745613_437Wx649H_202210030004351.jpeg" />
      <Card.Body className='p-body'>
        <div className='p-title'>
            Titel
        </div>
        <Card.Text className='p-text row'>
            <div className='col-8'>
            Some quick example text to build
            </div>
            <div className='p-price col-4'>
afa
            </div>
            </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className='p-card'>
  <Card className='p-card m-auto'>
      <Card.Img className='p-image' variant="top" src="https://img.tatacliq.com/images/i8/437Wx649H/MP000000014745613_437Wx649H_202210030004351.jpeg" />
      <Card.Body className='p-body'>
        <div className='p-title'>
            Titel
        </div>
        <Card.Text className='p-text row'>
            <div className='col-8'>
            Some quick example text to build
            </div>
            <div className='p-price col-4'>
afa
            </div>
            </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className='p-card'>
  <Card className='p-card m-auto'>
      <Card.Img className='p-image' variant="top" src="https://img.tatacliq.com/images/i8/437Wx649H/MP000000014745613_437Wx649H_202210030004351.jpeg" />
      <Card.Body className='p-body'>
        <div className='p-title'>
            Titel
        </div>
        <Card.Text className='p-text row'>
            <div className='col-8'>
            Some quick example text to build
            </div>
            <div className='p-price col-4'>
afa
            </div>
            </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className='p-card'>
  <Card className='p-card m-auto'>
      <Card.Img className='p-image' variant="top" src="https://img.tatacliq.com/images/i8/437Wx649H/MP000000014745613_437Wx649H_202210030004351.jpeg" />
      <Card.Body className='p-body'>
        <div className='p-title'>
            Titel
        </div>
        <Card.Text className='p-text row'>
            <div className='col-8'>
            Some quick example text to build
            </div>
            <div className='p-price col-4'>
afa
            </div>
            </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className='p-card'>
  <Card className='p-card m-auto'>
      <Card.Img className='p-image' variant="top" src="https://img.tatacliq.com/images/i8/437Wx649H/MP000000014745613_437Wx649H_202210030004351.jpeg" />
      <Card.Body className='p-body'>
        <div className='p-title'>
            Titel
        </div>
        <Card.Text className='p-text row'>
            <div className='col-8'>
            Some quick example text to build
            </div>
            <div className='p-price col-4'>
afa
            </div>
            </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className='p-card'>
  <Card className='p-card m-auto'>
      <Card.Img className='p-image' variant="top" src="https://img.tatacliq.com/images/i8/437Wx649H/MP000000014745613_437Wx649H_202210030004351.jpeg" />
      <Card.Body className='p-body'>
        <div className='p-title'>
            Titel
        </div>
        <Card.Text className='p-text row'>
            <div className='col-8'>
            Some quick example text to build
            </div>
            <div className='p-price col-4'>
afa
            </div>
            </Card.Text>
      </Card.Body>
    </Card>
  </div>
</Carousel>
      </div>
    </div>
  )
}

export default Recomendation
