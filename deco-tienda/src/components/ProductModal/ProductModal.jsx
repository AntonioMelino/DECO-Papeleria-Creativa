// src/components/ProductModal/ProductModal.jsx

import React, { useState, useEffect, useCallback } from 'react';
import './ProductModal.css';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasPhotos = product.photos && product.photos.length > 0;
  const totalPhotos = hasPhotos ? product.photos.length : 0;

  // Reset photo index when product changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [product.id]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? totalPhotos - 1 : i - 1));
  }, [totalPhotos]);

  const goToNext = useCallback(() => {
    setCurrentIndex((i) => (i === totalPhotos - 1 ? 0 : i + 1));
  }, [totalPhotos]);

  const handleAddAndClose = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <div className="product-modal__overlay" onClick={onClose}>
      <div
        className="product-modal__panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button className="product-modal__close" onClick={onClose}>✕</button>

        {/* ── Gallery ── */}
        <div className="product-modal__gallery">
          <div className={`product-modal__main-img ${product.bg}`}>
            {hasPhotos ? (
              <>
                <img
                  src={product.photos[currentIndex]}
                  alt={`${product.name} - foto ${currentIndex + 1}`}
                />
                {totalPhotos > 1 && (
                  <span className="product-modal__counter">
                    {currentIndex + 1} / {totalPhotos}
                  </span>
                )}
                {totalPhotos > 1 && (
                  <>
                    <button
                      className="product-modal__arrow product-modal__arrow--prev"
                      onClick={goToPrev}
                      aria-label="Foto anterior"
                    >
                      ‹
                    </button>
                    <button
                      className="product-modal__arrow product-modal__arrow--next"
                      onClick={goToNext}
                      aria-label="Foto siguiente"
                    >
                      ›
                    </button>
                  </>
                )}
              </>
            ) : (
              <span className="product-modal__main-icon">{product.icon}</span>
            )}
          </div>

          {/* Thumbnail strip */}
          {hasPhotos && totalPhotos > 1 && (
            <div className="product-modal__thumbs">
              {product.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className={`product-modal__thumb ${idx === currentIndex ? 'product-modal__thumb--active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <img src={photo} alt={`Miniatura ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="product-modal__info">
          <div className="product-modal__category">{product.catLabel}</div>
          <h2 className="product-modal__name">{product.name}</h2>
          <p className="product-modal__desc">{product.desc}</p>

          <div className="product-modal__divider" />

          <div className="product-modal__price-row">
            <span className="product-modal__price-currency">$</span>
            <span className="product-modal__price">
              {product.price.toLocaleString('es-AR')}
            </span>
          </div>

          <p className="product-modal__note">
            💬 Podés personalizar este producto al hacer el pedido por WhatsApp.
          </p>

          <button className="product-modal__add-btn" onClick={handleAddAndClose}>
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
