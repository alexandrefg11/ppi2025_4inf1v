import React from 'react';
import './Cart.css';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
      </div>

      <div className="cart-item-controls">
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </div>

      <div className="cart-item-price">R$ {item.price.toFixed(2)}</div>

      <button className="remove-btn" onClick={onRemove}>Remover</button>
    </div>
  );
}