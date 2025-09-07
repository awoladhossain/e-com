import ProductsCard from "../product/ProductsCard";

const Shop = () => {
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
          <div>left side</div>
          <div>
            <h3 className="text-xl font-medium mb-4">showing 1 to 8 of 12 products</h3>
            <ProductsCard products={[]}/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
