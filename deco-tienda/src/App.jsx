// src/App.jsx
// =========================================
// Componente raíz — maneja todo el estado
// =========================================

import React, { useState, useCallback, useRef } from 'react';

import Navbar        from './components/Navbar/Navbar';
import Hero          from './components/Hero/Hero';
import ProductGrid   from './components/ProductGrid/ProductGrid';
import ProductModal  from './components/ProductModal/ProductModal';
import Cart          from './components/Cart/Cart';
import Toast         from './components/Toast/Toast';
import Footer        from './components/Footer/Footer';

import './styles/global.css';

export default function App() {
  // ── Category filter ──────────────────────
  const [activeCategory, setActiveCategory] = useState('todo');

  // ── Cart ─────────────────────────────────
  const [cart, setCart]         = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✨ ${product.name} agregado`);
  }, []);

  const changeQty = useCallback((id, delta) => {
    setCart((prev) => {
      const updated = prev.map((i) =>
        i.id === id ? { ...i, qty: i.qty + delta } : i
      );
      return updated.filter((i) => i.qty > 0);
    });
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // ── Product detail modal ─────────────────
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ── Toast ────────────────────────────────
  const [toastMsg, setToastMsg]   = useState('');
  const toastTimer                = useRef(null);

  const showToast = (msg) => {
    clearTimeout(toastTimer.current);
    setToastMsg('');                          // reset so same msg re-triggers
    requestAnimationFrame(() => {
      setToastMsg(msg);
    });
  };

  return (
    <>
      {/* ── Navigation ── */}
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Product gallery ── */}
      <ProductGrid
        activeCategory={activeCategory}
        onAddToCart={addToCart}
        onOpenDetail={setSelectedProduct}
      />

      {/* ── Product detail modal ── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* ── Cart panel ── */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onChangeQty={changeQty}
      />

      {/* ── Toast notification ── */}
      <Toast message={toastMsg} />

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
