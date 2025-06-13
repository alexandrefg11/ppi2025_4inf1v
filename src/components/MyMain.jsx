import styles from "./MyMain.module.css";

export default function MyMain() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {[0, 1, 2, 3, 4, 5].map((id) => (
          <div key={id} className={styles.card}>
            <img src={`https://picsum.photos/300/200?random=${id}`} alt={`Imagem aleatória ${id}`} />
            <h3>Card {id}</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.{id}.</p>
          </div>
        ))}
      </div>
    </main>
  );
}
