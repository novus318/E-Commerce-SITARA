import React, { useEffect, useState } from "react";
import MenuSidebar from "./Sidebar";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  //get all product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        setProducts(data?.products);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while loading category");
    }
  };
  useEffect(() => {
    getAllProduct();
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
          <div className="d-flex">
            <MenuSidebar />
            <div className="m-auto col-7 text-center">
              <h1 className="head-t mt-3">All Products</h1>
              <div className="row">
                {products?.map((p) => (
                  <div className="product-card mb-3">
                    <Link key={p._id} to={`/admin/products/${p.slug}`}>
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Products;
