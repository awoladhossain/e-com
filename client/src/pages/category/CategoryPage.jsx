import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import ProductsCard from "../product/ProductsCard";
const CategoryPage = () => {
  const { categoryName } = useParams();
  // console.log(useParams());
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [categoryName]);
console.log(filteredProducts)
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">
          Category Name: {categoryName}
        </h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          ipsum id modi corrupti hic. Animi vitae rerum quam culpa recusandae.
        </p>
      </section>

      {/* Product cart */}
      <div className="section__container">
        <ProductsCard products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;
