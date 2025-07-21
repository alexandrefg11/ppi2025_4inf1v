import React from 'react';
import './Cart.css';

export default function CartSummary({ total, onClear }) {
  return (
    <div className="cart-summary">
      <h2>Resumo</h2>
      <p>Total: <strong>R$ {total.toFixed(2)}</strong></p>
      <button className="clear-btn" onClick={onClear}>Remover todos os produtos</button>
    </div>
  );
}