'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CurrencySwitcher from '@/components/ui/CurrencySwitcher';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/fleet', label: 'Our Fleet' },
  // { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
      <div className="container">
        <Link className="navbar-brand" href="/">Drive<span>Away</span></Link>
        <button className="navbar-toggler" type="button"
          onClick={() => setOpen((v) => !v)}
          aria-controls="ftco-nav" aria-expanded={open} aria-label="Toggle navigation">
          <span className="oi oi-menu"></span> Menu
        </button>
        <div className={`collapse navbar-collapse${open ? ' show' : ''}`} id="ftco-nav">
          <ul className="navbar-nav ml-auto align-items-lg-center">
            {links.map(({ href, label }) => (
              <li key={href} className={`nav-item${pathname === href ? ' active' : ''}`}>
                <Link href={href} className="nav-link" onClick={() => setOpen(false)}>{label}</Link>
              </li>
            ))}
            <li className="nav-item d-flex align-items-center">
              <CurrencySwitcher />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
