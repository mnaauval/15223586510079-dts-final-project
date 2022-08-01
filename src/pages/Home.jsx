import React from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import NewestProducts from "../components/ProductList/NewestProducts";

const Home = () => {
  return (
    <>
      <Slider />
      <Categories />
      <NewestProducts />
    </>
  );
};

export default Home;
