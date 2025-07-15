import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-black text-neutral-content p-10">
      <nav>
        <h6 className="footer-title">Furniq</h6>
        <Link to="/about" className="link link-hover">Our Story</Link>
        <Link to="/about#sustainability" className="link link-hover">Sustainability</Link>
        <Link to="/about#craftsmanship" className="link link-hover">Craftsmanship</Link>
        <Link to="/shop" className="link link-hover">Showroom</Link>
      </nav>

      <nav>
        <h6 className="footer-title">Support</h6>
        <Link to="/contact" className="link link-hover">Contact Us</Link>
        <Link to="/shipping" className="link link-hover">Shipping & Delivery</Link>
        <Link to="/return-policy" className="link link-hover">Returns & Exchanges</Link>
        <Link to="/faqs" className="link link-hover">FAQs</Link>
      </nav>

      <nav>
        <h6 className="footer-title">Legal</h6>
        <Link to="/terms" className="link link-hover">Terms & Conditions</Link>
        <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
        <Link to="/cookies" className="link link-hover">Cookies</Link>
      </nav>
    </footer>
  );
}

export default Footer;
