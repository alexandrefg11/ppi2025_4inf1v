import { useContext, useState } from "react";
import styles from "./User.module.css";
import { CartContext } from "../context/CartContext";
import { SessionContext } from "../context/SessionContext";
import { supabase } from "../utils/supabase";

export function User() {
  const { session, handleSignOut } = useContext(SessionContext);
  const { products, fetchProducts } = useContext(CartContext);

  const [form, setForm] = useState({ title: "", description: "", price: "", thumbnail: "" });
  const [editing, setEditing] = useState(null);

  async function handleAdd(e) {
    e.preventDefault();
    try {
      await supabase.from("product_1v").insert([
        {
          title: form.title,
          description: form.description,
          price: parseFloat(form.price) || 0,
          thumbnail: form.thumbnail,
        },
      ]);
      setForm({ title: "", description: "", price: "", thumbnail: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    try {
      await supabase.from("product_1v").delete().eq("id", id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  function startEdit(p) {
    setEditing(p.id);
    setForm({ title: p.title, description: p.description, price: p.price, thumbnail: p.thumbnail });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await supabase
        .from("product_1v")
        .update({ title: form.title, description: form.description, price: parseFloat(form.price) || 0, thumbnail: form.thumbnail })
        .eq("id", editing);
      setEditing(null);
      setForm({ title: "", description: "", price: "", thumbnail: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  if (!session) {
    return (
      <div className={styles.container}>
        <h1>User not signed in!</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {session.user.user_metadata.admin ? (
        <div>
          <h1>Admin Account</h1>
          <div className={styles.userInfo}>
            <p>
              <strong>Username: </strong>
              {session.user.user_metadata.username}
            </p>
            <p>
              <strong>Email: </strong>
              {session.user.email}
            </p>
            <p>
              <strong>ID: </strong>
              {session.user.id}
            </p>
          </div>

          <section style={{ marginTop: "1rem" }}>
            <h2>Manage Products</h2>
            <form onSubmit={editing ? handleUpdate : handleAdd} className={styles.form}>
              <input placeholder="Title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
              <input placeholder="Description" value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />
              <input placeholder="Price" value={form.price} onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))} />
              <input placeholder="Thumbnail URL" value={form.thumbnail} onChange={(e) => setForm((s) => ({ ...s, thumbnail: e.target.value }))} />
              <button type="submit">{editing ? "Update" : "Add"}</button>
              {editing && <button type="button" onClick={() => { setEditing(null); setForm({ title: "", description: "", price: "", thumbnail: "" }); }}>Cancel</button>}
            </form>

            <div style={{ marginTop: "1rem" }}>
              <h3>Products</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.price}</td>
                      <td>
                        <button onClick={() => startEdit(p)}>Edit</button>
                        <button onClick={() => handleDelete(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <button className={styles.button} onClick={handleSignOut}>
            SIGN OUT
          </button>
        </div>
      ) : (
        <div>
          <h1>User Account</h1>
          <div className={styles.userInfo}>
            <p>
              <strong>Username: </strong>
              {session.user.user_metadata.username}
            </p>
            <p>
              <strong>Email: </strong>
              {session.user.email}
            </p>
            <p>
              <strong>ID: </strong>
              {session.user.id}
            </p>
          </div>
          <button className={styles.button} onClick={handleSignOut}>
            SIGN OUT
          </button>
        </div>
      )}
    </div>
  );
}
