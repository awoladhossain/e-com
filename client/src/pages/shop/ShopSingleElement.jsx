import { Link, useParams } from "react-router-dom";
import RatingStar from "../../components/RatingStar";
import { useFetchSingleProductByIdQuery } from "../../redux/features/products/productsApi";
import ReviewsCard from "../reviews/ReviewsCard";

const ShopSingleElement = () => {
  const { id } = useParams();
  // Fetch the product details using the id if needed
  const { data, isLoading, isError } = useFetchSingleProductByIdQuery(id);
  console.log(data);
  const { product, reviews } = data || {};
  console.log(product, reviews);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading product details.</div>;
  }
  return (
    <>
      <section className="section__container rounded bg-primary-light">
        <h2 className="section__header">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{product?.name}</span>
        </div>
      </section>
      {/* Product Details */}
      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp5gJhJGcRhPJzKebpJolER6TyzMRfc3f-9Q&s"
              alt=""
              className="rounded-md w-full h-auto"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">{product?.name}</h3>
            <p className="text-xl text-primary mb-4">
              ${product?.price} <s>${product?.oldPrice}</s>
            </p>
            <p className="text-gray-700 mb-4">{product?.description}</p>

            {/* Additional Product Information */}
            <div className="flex flex-col space-y-2">
              <p>
                <strong>Category:</strong> {product?.category}
              </p>
              <p>
                <strong>Color:</strong> {product?.color}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating: </strong>
                <RatingStar productRating={product?.rating} />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="mt-6 px-6 py-3 bg-primary text-white rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
        {/* Reviews Section */}
      </section>
      {/* Add comment section */}
      <section className="section__container mt-8">
        <ReviewsCard reviews={reviews} />
      </section>
    </>
  );
};

export default ShopSingleElement;
