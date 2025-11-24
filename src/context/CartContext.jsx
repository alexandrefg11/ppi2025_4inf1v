import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "./SessionContext";

export const CartContext = createContext({
  products: [],
  loading: false,
  error: null,
  cart: [],
  addToCart: () => {},
  updateQtyCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  fetchProducts: () => {},
});

const LOCAL_CART_KEY = "tja_cart_local";

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { session } = useContext(SessionContext);

  // Cart state (local in-memory)
  const [cart, setCart] = useState([]);

  // Fetch products from Supabase
  async function fetchProducts() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("product_1v").select();
      if (error) throw error;
      setProducts(data || []);
      setError(null);
    } catch (err) {
      setError(`Fetching products failed! ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // LocalStorage helpers
  function loadCartFromLocal() {
    try {
      const raw = localStorage.getItem(LOCAL_CART_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (err) {
      return [];
    }
  }

  function saveCartToLocal(cartToSave) {
    try {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cartToSave));
    } catch (err) {
      // ignore
    }
  }

  // Supabase cart helpers (assumes table `cart` exists with columns: id, user_id, product_id, quantity, product_data)
  async function fetchCartFromDB(userId) {
    const { data, error } = await supabase
      .from("cart")
      .select("product_data,quantity,product_id")
      .eq("user_id", userId);
    if (error) throw error;
    return (data || []).map((row) => ({ ...row.product_data, quantity: row.quantity }));
  }

  async function upsertCartItemDB(userId, item) {
    // Try to update first
    const { data: existing, error: selErr } = await supabase
      .from("cart")
      .select("id,quantity")
      .match({ user_id: userId, product_id: item.id })
      .limit(1)
      .maybeSingle();
    if (selErr) throw selErr;

    if (existing && existing.id) {
      const { error: updErr } = await supabase
        .from("cart")
        .update({ quantity: item.quantity, product_data: item })
        .eq("id", existing.id);
      if (updErr) throw updErr;
    } else {
      const { error: insErr } = await supabase.from("cart").insert([
        {
          user_id: userId,
          product_id: item.id,
          quantity: item.quantity,
          product_data: item,
        },
      ]);
      if (insErr) throw insErr;
    }
  }

  async function removeCartItemDB(userId, productId) {
    const { error } = await supabase
      .from("cart")
      .delete()
      .match({ user_id: userId, product_id: productId });
    if (error) throw error;
  }

  async function clearCartDB(userId) {
    const { error } = await supabase.from("cart").delete().eq("user_id", userId);
    if (error) throw error;
  }

  // Load cart on mount or when session changes
  useEffect(() => {
    let mounted = true;
    async function initCart() {
      if (session && session.user) {
        // If there's a local cart, merge into DB
        const local = loadCartFromLocal();
        if (local && local.length > 0) {
          try {
            for (const item of local) {
              // For merging, fetch existing quantity and sum
              const { data: existing } = await supabase
                .from("cart")
                .select("quantity")
                .match({ user_id: session.user.id, product_id: item.id })
                .limit(1)
                .maybeSingle();
              const newQty = (existing?.quantity || 0) + (item.quantity || 1);
              await upsertCartItemDB(session.user.id, { ...item, quantity: newQty });
            }
            localStorage.removeItem(LOCAL_CART_KEY);
          } catch (err) {
            // ignore merge errors
          }
        }

        try {
          const dbCart = await fetchCartFromDB(session.user.id);
          if (mounted) setCart(dbCart || []);
        } catch (err) {
          if (mounted) setCart([]);
        }
      } else {
        // Load from localstorage
        const local = loadCartFromLocal();
        if (mounted) setCart(local || []);
      }
    }
    initCart();
    return () => {
      mounted = false;
    };
  }, [session]);

  // Cart operations
  async function addToCart(product) {
    const existing = cart.find((c) => c.id === product.id);
    if (existing) {
      await updateQtyCart(product.id, existing.quantity + 1);
    } else {
      const item = { ...product, quantity: 1 };
      const newCart = [...cart, item];
      setCart(newCart);
      if (session && session.user) {
        try {
          await upsertCartItemDB(session.user.id, item);
        } catch (err) {
          // ignore DB errors for now
        }
      } else {
        saveCartToLocal(newCart);
      }
    }
  }

  async function removeFromCart(productId) {
    const newCart = cart.filter((c) => c.id !== productId);
    setCart(newCart);
    if (session && session.user) {
      try {
        await removeCartItemDB(session.user.id, productId);
      } catch (err) {
        // ignore
      }
    } else {
      saveCartToLocal(newCart);
    }
  }

  async function updateQtyCart(productId, quantity) {
    const newCart = cart.map((c) => (c.id === productId ? { ...c, quantity } : c));
    setCart(newCart);
    if (session && session.user) {
      const item = newCart.find((c) => c.id === productId);
      if (item) {
        try {
          await upsertCartItemDB(session.user.id, item);
        } catch (err) {
          // ignore
        }
      }
    } else {
      saveCartToLocal(newCart);
    }
  }

  async function clearCart() {
    setCart([]);
    if (session && session.user) {
      try {
        await clearCartDB(session.user.id);
      } catch (err) {
        // ignore
      }
    } else {
      saveCartToLocal([]);
    }
  }

  const context = {
    products,
    loading,
    error,
    cart,
    addToCart,
    updateQtyCart,
    removeFromCart,
    clearCart,
    fetchProducts,
  };

  return <CartContext.Provider value={context}>{children}</CartContext.Provider>;
}

