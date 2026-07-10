export default function PageHero({ title, breadcrumb, bg = '/images/bg_2.jpg' }) {
  return (
    <section
      className="hero-wrap hero-wrap-2 js-fullheight"
      style={{ backgroundImage: `url('${bg}')` }}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
          <div className="col-md-9 ftco-animate pb-5">
            <p className="breadcrumbs">
              <span className="mr-2">
                <a href="/">Home <i className="ion-ios-arrow-forward"></i></a>
              </span>
              <span>{breadcrumb} <i className="ion-ios-arrow-forward"></i></span>
            </p>
            <h1 className="mb-3 bread">{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
