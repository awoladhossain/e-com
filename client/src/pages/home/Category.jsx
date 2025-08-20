import { Link } from "react-router-dom";
import category1 from "../../assets/category-1.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-3.jpg";
import category4 from "../../assets/category-4.jpg";

const Category = () => {
  const categories = [
    { id: 1, name: "Accessories", path: "accessories", image: category1 },
    { id: 2, name: "Dress Collection", path: "dress", image: category2 },
    { id: 3, name: "Jewellery", path: "jewellery", image: category3 },
    { id: 4, name: "Cosmetics", path: "cosmetics", image: category4 },
  ];
  return (
    <section className="product__grid">
      {categories.map((data) => (
        <Link
          className="categories__card"
          to={`/categories/${data.path}`}
          key={data.id}
        >
          <img src={data.image} alt={data.name} />
          <h4>{data.name}</h4>
        </Link>
      ))}
    </section>
  );
};

export default Category;
