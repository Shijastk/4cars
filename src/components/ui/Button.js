export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = `btn btn-${variant} ${className}`;
  if (href) return <a href={href} className={base}>{children}</a>;
  return <button className={base} {...props}>{children}</button>;
}
