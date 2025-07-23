import styles from "./Cart.module.css";

export function Cart({ cart, onIncrease, onDecrease, onRemove, onClear }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2.5fr 1.2fr",
        gap: "3.5rem",
        alignItems: "flex-start",
        maxWidth: "1500px",
        margin: "3rem auto",
        minHeight: "85vh",
        padding: "0 2rem",
      }}
    >
      {/* Coluna dos produtos */}
      <div className={styles.cart} style={{ minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#fff" }}>
            <span style={{ color: "#ff6600", marginRight: 8 }}>🛒</span>
            PRODUTO E SERVIÇO
          </h2>
          <button className={styles.clearBtn} onClick={onClear}>
            REMOVER TODOS OS PRODUTOS
          </button>
        </div>
        <div style={{ color: "#fff", fontSize: "1.25rem", margin: "0.9rem 0 2rem 0" }}>
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
                  <h3 style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: 4, color: "var(--gray-800)" }}>{product.title}</h3>
                  <div style={{ color: "var(--gray-600)", fontSize: "1rem", marginBottom: 8 }}>
                    Com desconto no PIX: <b style={{ color: "#009900" }}>${(product.price * 0.9).toFixed(2)}</b><br />
                    Parcelado no cartão sem juros: <b style={{ color: "var(--gray-800)" }}>${(product.price).toFixed(2)}</b>
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
                <div style={{ minWidth: 160, textAlign: "right" }}>
                  <div style={{ color: "#ff6600", fontWeight: "bold", fontSize: "1.4rem" }}>
                    ${(product.price * product.quantity).toFixed(2)}
                  </div>
                  <div style={{ fontSize: "1.05rem", color: "#009900" }}>
                    no PIX: ${(product.price * 0.9 * product.quantity).toFixed(2)}
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
          marginTop: 40,
          padding: "2.2rem"
        }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: 12, color: "var(--gray-800)" }}>🛡️ SERVIÇOS</h3>
          <div style={{ fontWeight: "bold", marginBottom: 12, color: "var(--gray-700)" }}>GARANTIA ESTENDIDA ORIGINAL AMPLIADA</div>
          <div style={{ color: "var(--gray-700)" }}>
            <label><input type="radio" name="garantia" defaultChecked /> Sem garantia</label><br />
            <label><input type="radio" name="garantia" disabled /> 12 Meses de Garantia Estendida Kabum <span style={{ color: "#ff6600" }}>Até 10x sem juros de $38.31</span></label><br />
            <label><input type="radio" name="garantia" disabled /> 24 Meses de Garantia Estendida Kabum <span style={{ color: "#ff6600" }}>Até 10x sem juros de $51.83</span></label>
          </div>
          <div style={{ marginTop: 16, fontWeight: "bold", color: "var(--gray-800)" }}>Subtotal serviços: $0.00</div>
        </div>
      </div>
      {/* Coluna do resumo */}
      <div className={styles.summary} style={{
        background: "var(--gray-200)",
        border: "1px solid var(--gray-300)",
        borderRadius: "12px",
        padding: "3rem",
        minWidth: 400,
        maxWidth: 540,
        position: "sticky",
        top: "2rem",
        alignSelf: "flex-start"
      }}>
        <h3 style={{ fontWeight: "bold", fontSize: "1.6rem", marginBottom: 28, color: "var(--gray-800)" }}>RESUMO</h3>
        <div style={{ marginBottom: "1.7rem", color: "var(--gray-700)" }}>
          <span>Valor dos Produtos:</span>
          <strong style={{ float: "right", color: "var(--gray-800)" }}>${total.toFixed(2)}</strong>
        </div>
        <div style={{ marginBottom: "1.7rem", color: "var(--gray-700)" }}>
          <span>Total a prazo:</span>
          <strong style={{ float: "right", color: "var(--gray-800)" }}>${total.toFixed(2)}</strong>
          <div style={{ fontSize: "1.07em", color: "var(--gray-600)" }}>
            (em até 10x de ${(total / 10).toFixed(2)} sem juros)
          </div>
        </div>
        <div style={{
          background: "#e6fff0",
          padding: "1.2rem",
          borderRadius: "7px",
          marginBottom: "1.7rem"
        }}>
          <span>Valor à vista no <b>PIX</b>:</span>
          <strong style={{ float: "right", color: "#009900" }}>${(total * 0.9).toFixed(2)}</strong>
          <div style={{ fontSize: "1.07em", color: "#009900" }}>
            (Economize: ${(total * 0.1).toFixed(2)})
          </div>
        </div>
        <button style={{
          width: "100%",
          background: "#ff6600",
          color: "#fff",
          border: "none",
          padding: "1.3rem",
          borderRadius: "7px",
          fontWeight: "bold",
          fontSize: "1.25rem",
          cursor: "pointer",
          marginBottom: "1.1rem"
        }}>
          CONTINUAR
        </button>
        <button style={{
          width: "100%",
          background: "#fff",
          color: "#ff6600",
          border: "2px solid #ff6600",
          padding: "1.3rem",
          borderRadius: "7px",
          fontWeight: "bold",
          fontSize: "1.25rem",
          cursor: "pointer"
        }}>
          VOLTAR
        </button>
      </div>
    </div>
  );
}