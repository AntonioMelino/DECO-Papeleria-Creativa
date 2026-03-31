// src/components/ProductGrid/ProductGrid.jsx

import React from 'react';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ activeCategory, onAddToCart, onOpenDetail }) {
  const filtered =
    activeCategory === 'todo'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.cat === activeCategory);

  const catObj = CATEGORIES.find((c) => c.id === activeCategory);
  const title = catObj?.id === 'todo' ? 'Todos los productos' : catObj?.label?.replace(/^.+?\s/, '') ?? 'Productos';

  return (
    <section className="product-grid-section">
      <h2 className="product-grid__title">{title}</h2>
      <div className="product-grid__grid">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </section>
  );
}
