const RatingStar = ({ productRating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        className={`ri-star${i <= productRating ? "-fill" : "-line"}`}
        key={i}
      ></span>
    );
  }
  return (
    <div className="product__rating">
      {stars}
    </div>
  );
};

export default RatingStar;
