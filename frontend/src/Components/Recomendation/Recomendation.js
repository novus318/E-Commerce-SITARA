import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Recomendation.css'

function Recomendation() {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 2000, min: 1100 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1000, min: 800 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 800, min: 400 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 400, min: 0 },
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
      <div className="product-card">
		<div className="product-tumb">
			<img src="https://img.tatacliq.com/images/i11/437Wx649H/MP000000017746702_437Wx649H_202305301112321.jpeg" alt=""/>
		</div>
		<div className="product-details">
			<div className='p-head'>Women leather bag</div>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
			<div className="product-bottom-details">
				<div className="product-links">
        <div className="product-price">₹ 230</div>
				</div>
			</div>
		</div>
	</div>
  <div className="product-card">
		<div className="product-tumb">
			<img src="https://img.tatacliq.com/images/i11/437Wx649H/MP000000017813986_437Wx649H_202306022359551.jpeg" alt=""/>
		</div>
		<div className="product-details">
			<div className='p-head'>Women leather bag</div>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
			<div className="product-bottom-details">
				<div className="product-links">
        <div className="product-price">₹ 230</div>
				</div>
			</div>
		</div>
	</div>
  <div className="product-card">
		<div className="product-tumb">
			<img src="https://img.tatacliq.com/images/i11/437Wx649H/MP000000017814083_437Wx649H_202306030003581.jpeg" alt=""/>
		</div>
		<div className="product-details">
			<div className='p-head'>Women leather bag</div>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
			<div className="product-bottom-details">
				<div className="product-links">
        <div className="product-price">₹ 230</div>
				</div>
			</div>
		</div>
	</div>
  <div className="product-card">
		<div className="product-tumb">
			<img src="https://img.tatacliq.com/images/i10/437Wx649H/MP000000017340053_437Wx649H_202304222223191.jpeg" alt=""/>
		</div>
		<div className="product-details">
			<div className='p-head'>Women leather bag</div>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
			<div className="product-bottom-details">
				<div className="product-links">
        <div className="product-price">₹ 230</div>
				</div>
			</div>
		</div>
	</div>
  <div className="product-card">
		<div className="product-tumb">
			<img src="https://img.tatacliq.com/images/i11/437Wx649H/MP000000017539780_437Wx649H_202305150728211.jpeg" alt=""/>
		</div>
		<div className="product-details">
			<div className='p-head'>Women leather bag</div>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
			<div className="product-bottom-details">
				<div className="product-links">
        <div className="product-price">₹ 230</div>
				</div>
			</div>
		</div>
	</div>
  <div className="product-card">
		<div className="product-tumb">
			<img src="https://img.tatacliq.com/images/i10/437Wx649H/MP000000016809635_437Wx649H_202303110201421.jpeg" alt=""/>
		</div>
		<div className="product-details">
			<div className='p-head'>Women leather bag</div>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
			<div className="product-bottom-details">
				<div className="product-links">
        <div className="product-price">₹ 230</div>
				</div>
			</div>
		</div>
	</div>
</Carousel>
    </div>
    </div>
  )
}

export default Recomendation
