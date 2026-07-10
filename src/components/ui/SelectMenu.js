export default function SelectMenu({ label, name, options = [], defaultLabel }) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="form-field">
        <div className="select-wrap">
          <div className="icon"><span className="ion-ios-arrow-down"></span></div>
          <select name={name} className="form-control">
            {defaultLabel && <option value="">{defaultLabel}</option>}
            {options.map((opt) =>
              typeof opt === 'string'
                ? <option key={opt} value={opt}>{opt}</option>
                : <option key={opt.value} value={opt.value}>{opt.label}</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
