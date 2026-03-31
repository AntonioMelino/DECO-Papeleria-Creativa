// src/components/Cart/Cart.jsx

import React from "react";
import "./Cart.css";

// WhatsApp number — reemplazá con el número real del local (código de país sin +)
const WA_NUMBER = "5491151225690";

export default function Cart({ isOpen, onClose, cart, onChangeQty }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const sendWhatsApp = () => {
    if (cart.length === 0) return;
    let msg = "🌸 *Hola DECO!* Me gustaría hacer el siguiente pedido:\n\n";
    cart.forEach((item) => {
      msg += `• ${item.icon} *${item.name}* (${item.catLabel})\n`;
      msg += `  Cantidad: ${item.qty} · Precio u.: $${item.price.toLocaleString("es-AR")}\n`;
      msg += `  Subtotal: $${(item.price * item.qty).toLocaleString("es-AR")}\n\n`;
    });
    msg += `━━━━━━━━━━━━━━\n`;
    msg += `💰 *Total estimado: $${total.toLocaleString("es-AR")}*\n\n`;
    msg += `Por favor, confirmar disponibilidad y forma de pago. ¡Gracias! 🎉`;
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart__overlay ${isOpen ? "cart__overlay--open" : ""}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`cart__panel ${isOpen ? "cart__panel--open" : ""}`}>
        {/* Header */}
        <div className="cart__header">
          <div className="cart__title">🛒 Mi pedido</div>
          <button className="cart__close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="cart__items">
          {cart.length === 0 ? (
            <div className="cart__empty">
              <div className="cart__empty-icon">🛍️</div>
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart__item">
                {/* Thumbnail */}
                <div className={`cart__item-icon ${item.bg}`}>
                  {item.photos && item.photos.length > 0 ? (
                    <img src={item.photos[0]} alt={item.name} />
                  ) : (
                    item.icon
                  )}
                </div>

                {/* Info */}
                <div className="cart__item-info">
                  <div className="cart__item-name">{item.name}</div>
                  <div className="cart__item-cat">{item.catLabel}</div>
                </div>

                {/* Price + qty */}
                <div className="cart__item-right">
                  <div className="cart__item-price">
                    ${(item.price * item.qty).toLocaleString("es-AR")}
                  </div>
                  <div className="cart__qty-controls">
                    <button
                      className="cart__qty-btn"
                      onClick={() => onChangeQty(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="cart__qty-num">{item.qty}</span>
                    <button
                      className="cart__qty-btn"
                      onClick={() => onChangeQty(item.id, +1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="cart__footer">
          <div className="cart__total-row">
            <span className="cart__total-label">Total estimado</span>
            <span className="cart__total-price">
              ${total.toLocaleString("es-AR")}
            </span>
          </div>
          <button
            className="cart__wa-btn"
            onClick={sendWhatsApp}
            disabled={cart.length === 0}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enviar pedido por WhatsApp
          </button>
          <p className="cart__wa-note">
            Tu pedido será enviado al local para coordinar entrega y pago.
          </p>
        </div>
      </div>
    </>
  );
}
