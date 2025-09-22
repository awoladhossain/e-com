import { useState } from "react";
import Loading from "../../components/Loading";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductsCard from "../product/ProductsCard";
import ShopFilter from "./ShopFilter";
const filters = [
  {
    categories: ["all", "accessories", "dress", "jwellary", "cosmetics"],
    colors: ["all", "red", "blue", "green", "black", "white"],
    priceRanges: [
      {
        label: "under $25",
        min: 0,
        max: 25,
      },
      { label: "$25 - $50", min: 25, max: 50 },
      { label: "$50 - $100", min: 50, max: 100 },
      { label: "$100 - $200", min: 100, max: 200 },
      { label: "over $200", min: 200, max: Infinity },
    ],
  },
];
const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8);
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRanges: "",
  });
  const { category, color, priceRanges } = filterState;
  const [minPrice, maxPrice] = priceRanges.split(" - ").map(Number);
  const { data, error, isLoading } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productPerPage,
  });
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error occurred: {error.toString()}</div>;
  }
  console.log(data);
  const startProduct = (currentPage - 1) * productPerPage + 1;
  const endProduct = startProduct + data.products.length - 1;

  // * Change the page
  const handleChangePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= data.totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  // * clear the filter
  const handleClearFilter = () => {
    setFilterState({
      category: "all",
      color: "all",
      priceRanges: "",
    });
  };

  return (
    <>
      <section className="section__container rounded bg-primary-light">
        <h2 className="section__header">Shop Page</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis aperiam alias possimus eveniet fuga perspiciatis ipsa
          labore nesciunt sint.
        </p>
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* this is the filter section */}
          <ShopFilter
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            handleClearFilter={handleClearFilter}
          />
          {/* this is the product list */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              showing {startProduct} to {endProduct} of {data.totalProducts}{" "}
              products
            </h3>
            <ProductsCard products={data.products} />
            {/* pagination */}
            {/* <div className="mt-8 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-400 text-gray-700"
                onClick={() => handleChangePage(currentPage - 1)}
              >
                Previous
              </button>
              {[...Array(data.totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-gray-700 text-white"
                      : "bg-gray-400 text-gray-700"
                  }`}
                  onClick={() => handleChangePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="px-4 py-2 bg-gray-400 text-gray-700"
                onClick={() => handleChangePage(currentPage + 1)}
              >
                Next
              </button>
            </div> */}
            {data.totalPages > 0 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  className={`px-4 py-2 rounded-l-lg border border-gray-300 transition-colors ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleChangePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  &larr; Prev
                </button>
                {[...Array(data.totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 border-t border-b border-gray-300 transition-colors ${
                      currentPage === index + 1
                        ? "bg-gray-700 text-white font-bold shadow-md border-x border-gray-700"
                        : "bg-white text-gray-700 hover:bg-gray-100 border-x"
                    }`}
                    onClick={() => handleChangePage(index + 1)}
                    aria-current={
                      currentPage === index + 1 ? "page" : undefined
                    }
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className={`px-4 py-2 rounded-r-lg border border-gray-300 transition-colors ${
                    currentPage === data.totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleChangePage(currentPage + 1)}
                  disabled={currentPage === data.totalPages}
                  aria-label="Next page"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
