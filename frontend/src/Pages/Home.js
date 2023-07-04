import React from 'react';
import Recomendation from '../Components/Recomendation/Recomendation'
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import Footer from '../Components/Footer/Footer';
import Categories from '../Components/Catergories/Categories';
import BestSellers from '../Components/Best sellers/BestSellers';

function Home(props) {
  return (
    <div className="home">
      <Header />
      <Banner />
      <Categories />
      <Recomendation/>
      <BestSellers/>
      <Footer />
    </div>
  );
}

export default Home;
 