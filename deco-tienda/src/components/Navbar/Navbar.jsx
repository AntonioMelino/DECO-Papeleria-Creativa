// src/components/Navbar/Navbar.jsx

import React from 'react';
import { CATEGORIES } from '../../data/products';
import './Navbar.css';

export default function Navbar({ activeCategory, onCategoryChange, cartCount, onOpenCart }) {
  return (
    <header className="navbar">
      <div className="navbar__top">
        {/* Logo */}
        <div className="navbar__logo">
          <span className="navbar__logo-name">
            DECO<span>·</span>
          </span>
          <span className="navbar__logo-tagline">Regalería &amp; Cotillón</span>
        </div>

        {/* Cart button */}
        <button className="navbar__cart-btn" onClick={onOpenCart}>
          🛒 Carrito
          <span className="navbar__cart-count">{cartCount}</span>
        </button>
      </div>

      {/* Category navigation */}
      <nav className="navbar__nav">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`navbar__nav-item ${activeCategory === cat.id ? 'navbar__nav-item--active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
