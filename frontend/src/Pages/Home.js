import React, { useEffect, useState } from "react";
import Recomendation from "../Components/Recomendation/Recomendation";
import Header from "../Components/Header/Header";
import Banner from "../Components/Banner/Banner";
import Footer from "../Components/Footer/Footer";
import Categories from "../Components/Catergories/Categories";
import BestSellers from "../Components/Best sellers/BestSellers";
import axios from "axios";
import toast from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";

function Home(props) {
  const [products, setProducts] = useState([]);
  const [productsR, setProductsR] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  //get all category

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Something went wrong while loading category");
    }
  };
  //get all products
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      toast.error("Something went wrong while loading category");
    }
  };
  //get all reccomended
  const getAllProductsRecommended = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-recommended");
      if (data?.success) {
        setProductsR(data?.products);
      }
    } catch (error) {
      toast.error("Something went wrong while loading category");
    }
  };
  //banners
  const getAllBanners = async () => {
    try {
      const { data } = await axios.get("/api/v1/banner/get-banners");
      if (data?.success) {
        setBanners(data?.banners)
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong while loading Banners");
    }
  };

  useEffect(() => {
    getAllProduct();
    getAllProductsRecommended();
    getAllCategory();
    getAllBanners();
  }, []);
  return (
    <div className="home">
      {!loading ? (
        <>
          <Header />
          <Banner banners={banners} />
          <Categories categories={categories} />
          <Recomendation products={productsR} />
          <BestSellers products={products} />
          <Footer categories={categories}/>
        </>
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
    </div>
  );
}

export default Home;
