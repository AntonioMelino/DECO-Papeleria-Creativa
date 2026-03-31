// src/components/ProductCard/ProductCard.jsx

import React from 'react';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart, onOpenDetail }) {
  const { name, catLabel, icon, price, desc, bg, badge, photos } = product;
  const hasPhotos = photos && photos.length > 0;

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent opening detail modal
    onAddToCart(product);
  };

  return (
    <div className="product-card" onClick={() => onOpenDetail(product)}>
      {/* Image / icon area */}
      <div className={`product-card__img ${bg}`}>
        {hasPhotos ? (
          <img
            className="product-card__photo"
            src={photos[0]}
            alt={name}
            loading="lazy"
          />
        ) : (
          <span className="product-card__icon">{icon}</span>
        )}

        {/* Hover overlay */}
        <div className="product-card__img-overlay">
          <span className="product-card__zoom-hint">🔍 Ver detalle</span>
        </div>

        {/* Badge */}
        {badge && <div className="product-card__badge">{badge}</div>}

        {/* Photo count */}
        {hasPhotos && photos.length > 1 && (
          <div className="product-card__photo-count">
            📷 {photos.length}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="product-card__info">
        <div className="product-card__category">{catLabel}</div>
        <div className="product-card__name">{name}</div>
        <div className="product-card__desc">{desc}</div>
        <div className="product-card__footer">
          <div className="product-card__price">
            <span>$</span>{price.toLocaleString('es-AR')}
          </div>
          <button
            className="product-card__add-btn"
            onClick={handleAddToCart}
            title="Agregar al carrito"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
