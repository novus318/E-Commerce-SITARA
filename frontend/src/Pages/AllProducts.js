import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Components/Header/Header";
import "./AllProducts.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import toast  from "react-hot-toast";
function AllProducts() {
  const params = useParams();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  //get category name
  const categoryName = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/single-category/${params.pid}`
      );
      if (data?.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //product
  const handleFilter = async () => {
    const id = params.pid;
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, {
        id,
      });
      if (data?.success) {
        setProducts(data?.products);
        setLoading(false);
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  };
  //all products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    handleFilter();
    categoryName();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
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
      ) : (
        <>
          <Header />
          <div className="text-center mb-5">
            <h1 className="head-t mt-5 upper">{category?.name} Collections</h1>
          </div>
          <div className="results ms-4 mb-3">
            {" "}
            Results: {products?.length} Products
          </div>
          <div className="row container justify-content-center">
            {products?.map((p) => (
              <div key={p._id} className="product-card mb-3">
                <Link to={`/product/${p.slug}`}>
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
          </div>
        </>
      )}
    </>
  );
}

export default AllProducts;
