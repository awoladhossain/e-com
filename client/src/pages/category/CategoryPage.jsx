import { useParams } from "react-router-dom";
import ProductsCard from "../product/ProductsCard";
import { useEffect } from "react";

const CategoryPage = () => {
  const { categoryName } = useParams();
  console.log(useParams());
  useEffect(()=>{
    // Fetch products based on categoryName
    
  },[])
  return (
    <>
      <section className="section__container bg-primary-light">
        <h1>Category Details</h1>
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
        <ProductsCard products={{}} />
      </div>
    </>
  );
};

export default CategoryPage;
