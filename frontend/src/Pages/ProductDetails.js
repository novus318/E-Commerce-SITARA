import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import "./AllProducts.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Components/Recomendation/Recomendation.css";
import { Link } from "react-router-dom";
import { useCart } from "../store/CartContext";
import toast from "react-hot-toast";
import { useAuth } from "../store/authContext";

function ProductDetails() {
  const params = useParams();
  const navigate=useNavigate()
  const [product, setProduct] = useState({});
  const [auth] = useAuth();
  const {addToCart}=useCart()
  const [selectImage, setSelectImage] = useState("");
  const [size, setSize] = useState('')
  const [similarProducts, setSimilarProducts] = useState([]);
  const [count, setCount] = useState(1)
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 2000, min: 1100 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1000, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 400 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 1,
    },
  };
  //add to cart
  const handdleAddToCart = (product, size, count) => {
    try {
      if(!size){
       toast.error('Select size')
        return
      }
      else{
         addToCart(product,size,count)
          toast.success('Item added to cart')
          navigate('/user/cart')
        };
    } catch (error) {
      
    }
  };
  const handdleBuyNow = (product, size, count) => {
    try {
      if(!size){
       toast.error('Select size')
        return
      }
      else{
         addToCart(product,size,count)
          toast.success('Item added to cart')
          
        };
    } catch (error) {
      
    }
  };
  //BuyNow
//quantity
const setIncrease=()=>{
  count < product.quantity ? setCount(count+1):setCount(product.quantity) 
}
const setDecrease=()=>{
  count > 1 ? setCount(count-1):setCount(1)  
}
  //similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setSimilarProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params?.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getSingleProduct();
    //eslint-disable-next-line
  }, [params?.slug]);
  return (
    <>
      <Header />
      {product.name ? (
        <div>
          <section className="py-5">
            <div className="container">
              <div className="row gx-5">
                <aside className="col-lg-6">
                  <div className="mb-4 d-flex justify-content-center">
                    <img
                      height={400}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100h",
                        margin: "auto",
                      }}
                      className="rounded-4 fit img img-responsive"
                      alt="pic"
                      src={
                        selectImage
                          ? selectImage
                          : `/api/v1/product/product-photo1/${product._id}`
                      }
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <img
                      width={60}
                      height={70}
                      onClick={() => {
                        setSelectImage(
                          `/api/v1/product/product-photo1/${product._id}`
                        );
                      }}
                      className="rounded-1 me-3"
                      alt="pic"
                      src={`/api/v1/product/product-photo1/${product._id}`}
                    />

                    <img
                      width={60}
                      height={70}
                      className="rounded-1 me-3"
                      onClick={() => {
                        setSelectImage(
                          `/api/v1/product/product-photo2/${product._id}`
                        );
                      }}
                      alt="pic"
                      src={`/api/v1/product/product-photo2/${product._id}`}
                    />

                    <img
                      width={60}
                      height={70}
                      className="rounded-1 me-3"
                      onClick={() => {
                        setSelectImage(
                          `/api/v1/product/product-photo3/${product._id}`
                        );
                      }}
                      alt="pic"
                      src={`/api/v1/product/product-photo3/${product._id}`}
                    />

                    <img
                      width={60}
                      height={70}
                      className="rounded-1 me-3"
                      onClick={() => {
                        setSelectImage(
                          `/api/v1/product/product-photo4/${product._id}`
                        );
                      }}
                      alt="pic"
                      src={`/api/v1/product/product-photo4/${product._id}`}
                    />
                  </div>
                </aside>
                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h2 className="head-t upper">{product?.name}</h2>
                    <div className="mb-3">
                      <span className="price">₹ {product?.price}</span>
                    </div>
                    <div className="mb-3">
                      <span className="category">
                        category : {product?.category?.name}
                      </span>
                    </div>
                    <h4 className="des">{product?.description}</h4>
                    <hr />
                    {product?.quantity ===0 ?(<>
                    <h3 className="stock-out">Out off stock</h3>
                    </>):(
                      <div className="row mb-4">
                      <div className="col-md-4 col-6">
                        <label className="mb-2">Size</label>
                        <select onChange={(e)=>{setSize(e.target.value)}}
                          className="form-select border border-secondary"
                          style={{ height: 35 }}
                        > <option value={null}>Select</option>
                          {product.sizes.map((size, index) => (
                            <option key={index} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4 col-6 mb-3">
                        <label className="mb-2 d-block">Quantity</label>
                        <div
                          className="input-group mb-3"
                          style={{ width: 170 }}
                        >
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon1"
                            data-mdb-ripple-color="dark" onClick={()=>{setDecrease()}}
                          >
                            <i className="fas fa-minus" />
                          </button>
                          <input
                            type="text"
                            className="form-control text-center border border-secondary"
                            placeholder={count}
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            value={count} disabled
                          />
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon2"
                            data-mdb-ripple-color="dark"onClick={()=>{setIncrease()}}
                          >
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                    ) }
                    {auth?.user?.role === 0 && (
                      <>
                        <button className="buy-btn p-1 ps-2 pe-2 me-3"
                        onClick={()=>handdleBuyNow(product,size,count)}>
                          <i className="me-1 fa fa-credit-card-alt fa-lg" /> Buy
                          now
                        </button>
                        <button
                          className="cart-btn p-1 ps-2 pe-2 me-3"
                          onClick={()=>handdleAddToCart(product,size,count)}
                        >
                          <i className="me-1 fa fa-cart-plus fa-lg" /> Add to
                          cart{" "}
                        </button>
                      </>
                    )}
                  </div>
                </main>
              </div>
            </div>
          </section>
          <div className="mt-4 mb-4">
            <div className="ms-5 mb-4">
              <h2 className="head-t">Similar Products</h2>
            </div>
            <div>
              <Carousel responsive={responsive} className="container-fluid">
                {similarProducts?.map((p) => (
                  <div className="m-auto product-card mb-3">
                    <Link to={`/product/${p.slug}`} key={p._id}>
                      <div className="product-tumb">
                        <img
                          className="p-img"
                          src={`/api/v1/product/product-photo1/${p._id}`}
                          alt={p.name}
                        />
                      </div>
                      <div className="product-details">
                        <div className="p-head">{p.name}</div>
                        <p>{p.description.substring(0, 40)}...</p>
                        <div className="product-bottom-details">
                          <div className="product-price">₹ {p.price}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      ) : (
        <ThreeCircles
          height="100"
          width="100"
          color="#656565"
          wrapperStyle={{}}
          wrapperClass="justify-content-center align-items-center h-100"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      )}
    </>
  );
}

export default ProductDetails;
