import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { CartProvider } from "./service/CartContext";
import { Telalogin } from "./components/Telalogin";
import { Telacadastro } from "./components/Telacadastro";
import { Telapossibilitar } from "./components/Telapossibilitar";

export default function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Telalogin />} />
          <Route path="/cadastro" element={<Telacadastro />} />
          <Route path="/produtos" element={<Telapossibilitar />} />
        </Routes>
      </CartProvider>
    </>
  );
}