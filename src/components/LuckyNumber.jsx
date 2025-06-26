import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {

  const [luckyNumber, setLuckyNumber] = useState(0);
  const [numerosSorteados, setNumerosSorteados] = useState([]);
  const [mensagem, setMensagem] = useState("");

  function handleClick() {
    const numero = Math.ceil(Math.random() * 31);

    if (numerosSorteados.includes(numero)) {
      setMensagem("Já foi sorteado!");
    } else {
      setLuckyNumber(numero);
      setNumerosSorteados([...numerosSorteados, numero]);
      setMensagem("");
    }
  }

  return (
    <div className={styles.container}>
      {luckyNumber ? (
        <h1>Lucky Number = {luckyNumber}</h1>
      ) : (
        <h1>Lucky Number 🎲</h1>
      )}

      {mensagem && <p className={styles.warning}>{mensagem}</p>}

      <button className={styles.button} onClick={handleClick}>
        I'm feeling lucky today!
      </button>
    </div>
  );
}
