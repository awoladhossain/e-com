import dealsLogo from "../../assets/deals.png";
import Countdown from "./Countdown";
const Deals = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsLogo} alt="deals" />
      </div>
      <div className="deals__content">
        <h5>Get Up To 20% Discount</h5>
        <h4>Deals Of This Month</h4>
        <p>
          Our Women's Fashion Deals of the Month are here to make your style
          dreams a reality without breaking the bank. Discover a curated
          collection of exquisite clothing, accessories, and footwear, all
          handpicked to elevate your wardrobe.
        </p>
        <Countdown />
      </div>
    </section>
  );
};

export default Deals;
