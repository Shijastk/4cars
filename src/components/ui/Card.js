export default function Card({ children, className = '' }) {
  return (
    <div className={`card h-100 border-0 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`card-body ${className}`}>{children}</div>;
};

Card.Image = function CardImage({ src, alt = '', style = {}, className = '', children }) {
  return (
    <div
      className={`card-img-top ${className}`}
      style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 200, position: 'relative', ...style }}
      role="img"
      aria-label={alt}
    >
      {children}
    </div>
  );
};
