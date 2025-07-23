import { useState } from "react";
import { Cart } from "../components/Cart";

// Exemplo de dados iniciais
const initialCart = [
  {
    title: "Monitor Gamer Curvo LG UltraGear LG 34\"",
    price: 1999.99,
    thumbnail: "https://images.kabum.com.br/produtos/foto/115/115000/monitor.jpg",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  function handleIncrease(product) {
    setCart(cart =>
      cart.map(item =>
        item.title === product.title
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function handleDecrease(product) {
    setCart(cart =>
      cart
        .map(item =>
          item.title === product.title && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function handleRemove(product) {
    setCart(cart => cart.filter(item => item.title !== product.title));
  }

  function handleClear() {
    setCart([]);
  }

  return (
    <Cart
      cart={cart}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      onRemove={handleRemove}
      onClear={handleClear}
    />
  );
}