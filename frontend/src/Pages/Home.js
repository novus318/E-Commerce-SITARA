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
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
 //banners
 const getAllBanners = async ({setLoading}) => {
  try {
    const { data } = await axios.get("/api/v1/banner/get-banners");
    if (data?.success) {
      setBanners(data?.banners)
      setLoading(false);
    }
  } catch (error) {
    
  }
};
  useEffect(() => {
getAllBanners()
}, []);
  return (
    <div className="home">
      {!loading ? (
        <>
          <Header />
          <Banner setLoading={setLoading} />
          <Categories  setLoading={setLoading}/>
          <Recomendation setLoading={setLoading} />
          <BestSellers setLoading={setLoading} />
          <Footer setLoading={setLoading}/>
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
