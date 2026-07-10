export default function SectionHeading({ sub, title, text, white = false, className = '' }) {
  return (
    <div className={`col-md-12 heading-section text-center ftco-animate mb-5 ${white ? 'heading-section-white' : ''} ${className}`}>
      {sub && <span className="subheading">{sub}</span>}
      <h2 className="mb-2">{title}</h2>
      {text && <p className="heading-section__text">{text}</p>}
    </div>
  );
}
