import ProductBlogs from "../blogs/ProductBlogs";
import Banner from "./Banner";
import Category from "./Category";
import Deals from "./Deals";
import Features from "./Features";
import TrendingProducts from "./TrendingProducts";
import Trends from "./Trends";

const Home = () => {
  return (
    <>
      <Banner />
      <Category />
      <Trends />
      <TrendingProducts />
      <Deals />
      <Features />
      <ProductBlogs/>
    </>
  );
};

export default Home;
