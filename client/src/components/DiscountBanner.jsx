import './DiscountBanner.css';

function DiscountBanner() {
  return (
    <section className="discount-banner" id="discount-banner">
      <div className="container discount-banner__inner">
        <div className="discount-banner__text">
          <h3 className="discount-banner__title">Super discount on more than 100 USD</h3>
          <p className="discount-banner__desc">Have you ever finally just write dummy info</p>
        </div>
        <button className="discount-banner__btn" id="discount-shop-now-btn">Shop now</button>
      </div>
    </section>
  );
}

export default DiscountBanner;
