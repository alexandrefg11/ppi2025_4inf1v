import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export default function LuckyNumber() {
  //REACT HOOK - useState()
  const [luckynumber, setLuckyNumber] = useState(0)
  function handleclick() {
    setLuckyNumber(Math.ceil(Math.random() * 31));
  }


  return (

    <div className={styles.Container}>
      {luckynumber ? (
        <h1>Lucky Number = {luckynumber}</h1>


      ) : (
        <h1>Lucky Number </h1>)
      }

      <h1>Contador={luckynumber}</h1>
      <button className={styles.button} onClick={handleClick}>Clique!</button>
    </div>

  );
}