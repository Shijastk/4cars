import Card from '../ui/Card';

export default function ServiceCard({ icon, title, text, dark = false }) {
  const inner = (
    <div className={`d-flex mb-3 ${dark ? 'flex-column align-items-center' : 'align-items-center'}`}>
      <div className={`icon ${dark ? 'd-flex align-items-center justify-content-center mb-2' : ''}`}>
        <span className={icon}></span>
      </div>
      <h3 className={`heading whitespace-nowrap mb-0 ${dark ? '' : 'pl-3'}`}>{title}</h3>
    </div>
  );

  // Dark variant (How it works) keeps its card treatment; the light service
  // blocks render flat — no card box, border or shadow.
  if (dark) {
    return (
      <div className="col-md-3 d-flex align-self-stretch ftco-animate">
        <Card className="services services-2 text-center w-100">
          <Card.Body className="py-md-4">
            {inner}
            <p>{text}</p>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="col-md-3 d-flex align-self-stretch ftco-animate">
      <div className="services w-100 py-md-4">
        {inner}
        <p>{text}</p>
      </div>
    </div>
  );
}
