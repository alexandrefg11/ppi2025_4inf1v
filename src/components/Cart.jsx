import styles from "./Cart.module.css";

export function Cart({ cart, onIncrease, onDecrease, onRemove, onClear }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
      {/* Coluna dos produtos */}
      <div className={styles.cart} style={{ flex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", margin: 0, color: "#fff" }}>
            <span style={{ color: "#ff6600", marginRight: 8 }}>🛒</span>
            PRODUTO E SERVIÇO
          </h2>
          <button className={styles.clearBtn} onClick={onClear}>
            REMOVER TODOS OS PRODUTOS
          </button>
        </div>
        <div style={{ color: "#fff", fontSize: "1rem", margin: "0.5rem 0 1.5rem 0" }}>
          Vendido e entregue por: <b style={{ color: "#fff" }}>KaBUM!</b>
        </div>
        {cart.length === 0 ? (
          <p style={{ color: "var(--gray-600)" }}>Seu carrinho está vazio.</p>
        ) : (
          <ul className={styles.cartList}>
            {cart.map((product, index) => (
              <li key={index} className={styles.cartItem}>
                <img src={product.thumbnail} alt={product.title} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: 4, color: "var(--gray-800)" }}>{product.title}</h3>
                  <div style={{ color: "var(--gray-600)", fontSize: "0.95rem", marginBottom: 8 }}>
                    Com desconto no PIX: <b style={{ color: "#009900" }}>R$ {(product.price * 0.9).toFixed(2)}</b><br />
                    Parcelado no cartão sem juros: <b style={{ color: "var(--gray-800)" }}>R$ {(product.price).toFixed(2)}</b>
                  </div>
                  <div className={styles.qtyControl}>
                    <span style={{ fontWeight: "bold", marginRight: 8, color: "var(--gray-800)" }}>Quant.</span>
                    <button onClick={() => onDecrease(product)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => onIncrease(product)}>+</button>
                  </div>
                  <button className={styles.removeBtn} onClick={() => onRemove(product)}>
                    REMOVER
                  </button>
                </div>
                <div style={{ minWidth: 120, textAlign: "right" }}>
                  <div style={{ color: "#ff6600", fontWeight: "bold", fontSize: "1.2rem" }}>
                    R$ {(product.price * product.quantity).toFixed(2)}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#009900" }}>
                    no PIX: R$ {(product.price * 0.9 * product.quantity).toFixed(2)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Serviços (visual, sem lógica) */}
        <div style={{
          background: "var(--gray-200)",
          borderRadius: 8,
          marginTop: 24,
          padding: "1.5rem"
        }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: 8, color: "var(--gray-800)" }}>🛡️ SERVIÇOS</h3>
          <div style={{ fontWeight: "bold", marginBottom: 8, color: "var(--gray-700)" }}>GARANTIA ESTENDIDA ORIGINAL AMPLIADA</div>
          <div style={{ color: "var(--gray-700)" }}>
            <label><input type="radio" name="garantia" defaultChecked /> Sem garantia</label><br />
            <label><input type="radio" name="garantia" disabled /> 12 Meses de Garantia Estendida Kabum <span style={{ color: "#ff6600" }}>Até 10x sem juros de R$ 38,31</span></label><br />
            <label><input type="radio" name="garantia" disabled /> 24 Meses de Garantia Estendida Kabum <span style={{ color: "#ff6600" }}>Até 10x sem juros de R$ 51,83</span></label>
          </div>
          <div style={{ marginTop: 12, fontWeight: "bold", color: "var(--gray-800)" }}>Subtotal serviços: R$ 0,00</div>
        </div>
      </div>
      {/* Coluna do resumo */}
      <div className={styles.summary} style={{
        flex: 1,
        background: "var(--gray-200)",
        border: "1px solid var(--gray-300)",
        borderRadius: "8px",
        padding: "1.5rem"
      }}>
        <h3 style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: 16, color: "var(--gray-800)" }}>RESUMO</h3>
        <div style={{ marginBottom: "1rem", color: "var(--gray-700)" }}>
          <span>Valor dos Produtos:</span>
          <strong style={{ float: "right", color: "var(--gray-800)" }}>R$ {total.toFixed(2)}</strong>
        </div>
        <div style={{ marginBottom: "1rem", color: "var(--gray-700)" }}>
          <span>Total a prazo:</span>
          <strong style={{ float: "right", color: "var(--gray-800)" }}>R$ {total.toFixed(2)}</strong>
          <div style={{ fontSize: "0.9em", color: "var(--gray-600)" }}>
            (em até 10x de R$ {(total / 10).toFixed(2)} sem juros)
          </div>
        </div>
        <div style={{
          background: "#e6fff0",
          padding: "0.5rem",
          borderRadius: "4px",
          marginBottom: "1rem"
        }}>
          <span>Valor à vista no <b>PIX</b>:</span>
          <strong style={{ float: "right", color: "#009900" }}>R$ {(total * 0.9).toFixed(2)}</strong>
          <div style={{ fontSize: "0.9em", color: "#009900" }}>
            (Economize: R$ {(total * 0.1).toFixed(2)})
          </div>
        </div>
        <button style={{
          width: "100%",
          background: "#ff6600",
          color: "#fff",
          border: "none",
          padding: "0.75rem",
          borderRadius: "4px",
          fontWeight: "bold",
          fontSize: "1.1rem",
          cursor: "pointer",
          marginBottom: "0.5rem"
        }}>
          CONTINUAR
        </button>
        <button style={{
          width: "100%",
          background: "#fff",
          color: "#ff6600",
          border: "2px solid #ff6600",
          padding: "0.75rem",
          borderRadius: "4px",
          fontWeight: "bold",
          fontSize: "1.1rem",
          cursor: "pointer"
        }}>
          VOLTAR
        </button>
      </div>
    </div>
  );
}
