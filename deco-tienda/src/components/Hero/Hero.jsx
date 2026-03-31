// src/components/Hero/Hero.jsx

import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero__badge">✦ Todo para tu celebración ✦</div>
        <h1 className="hero__title">
          Hacemos tus<br />
          <em>momentos</em><br />
          inolvidables
        </h1>
        <p className="hero__subtitle">
          Souvenirs, cotillón, detalles y mucho más. Diseñado con amor para cada ocasión especial.
        </p>
      </section>

      <div className="hero__divider">
        <span className="hero__divider-icon">🌸</span>
      </div>
    </>
  );
}
