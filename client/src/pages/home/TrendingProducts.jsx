import { useState } from "react";
import product from "../../data/products.json";
import ProductsCard from "../product/ProductsCard";
const TrendingProducts = () => {
  const [visiableProducts, setVisiableProducts] = useState(8);
  const handleLoadProduct = () => {
    setVisiableProducts((prev) => prev + 4);
  };
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, laborum
        quaerat nisi totam ea consectetur laboriosam repellendus corporis
        deserunt alias.
      </p>
      {/* products card */}
      <div className="mt-8">
        <ProductsCard products={product.slice(0, visiableProducts)} />
      </div>
      {/* load button */}
      <div className="product__btn">
        {visiableProducts < product.length && (
          <button onClick={handleLoadProduct} className="btn">
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
