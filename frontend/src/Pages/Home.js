import React from 'react';
import Recomendation from '../Components/Recomendation/Recomendation'
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import Footer from '../Components/Footer/Footer';
import Categories from '../Components/Catergories/Categories';

function Home(props) {
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Categories />
      <Recomendation/>
      <Footer />
    </div>
  );
}

export default Home;
 