import React from "react";
import Recomendation from "../Components/Recomendation/Recomendation";
import Header from "../Components/Header/Header";
import Banner from "../Components/Banner/Banner";
import Footer from "../Components/Footer/Footer";
import Categories from "../Components/Catergories/Categories";
import BestSellers from "../Components/Best sellers/BestSellers";

function Home(props) {
 //banners
  return (
        <>
          <Header />
          <Banner/>
          <Categories  />
          <Recomendation  />
          <BestSellers  />
          <Footer />
        </>
      
  );
}

export default Home;
