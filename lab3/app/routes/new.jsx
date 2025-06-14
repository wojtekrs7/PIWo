import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../src/firebase";
import { AuthContext } from "../Contexts/AuthContext";
import { BooksContext } from "../Contexts/BooksContext";

export default function New() {
  const { user } = useContext(AuthContext);
  const { fetchBooks } = useContext(BooksContext);
  const navigate = useNavigate();

  const [bookId, setBookId] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const [type, setType] = useState("Twarda okładka");

  useEffect(() => {
    const storedBook = localStorage.getItem("book-to-edit");
    if (storedBook) {
      const parsed = JSON.parse(storedBook);
      setBookId(parsed.id || null);
      setTitle(parsed.title || "");
      setAuthor(parsed.author || "");
      setPrice(parsed.price || "");
      setPages(parsed.pages || "");
      setType(parsed.type || "Twarda okładka");
      localStorage.removeItem("book-to-edit");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || price === "" || pages === "") return;

    const bookData = {
      title,
      author,
      price: parseFloat(price),
      pages: parseInt(pages),
      type,
      userId: user ? user.uid : "anonymous",
    };

    try {
      if (bookId) {
        const ref = doc(db, "books", bookId);
        await updateDoc(ref, bookData);
      } else {
        await addDoc(collection(db, "books"), bookData);
      }

      await fetchBooks();
      navigate("/");
    } catch (err) {
      alert("Błąd: " + err.message);
    }
  };

  return (
      <main className="list-vertical">
        <form className="list-vertical" onSubmit={handleSubmit}>
          <input
              placeholder="Tytuł książki"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
          />
          <input
              placeholder="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
          />
          <input
              type="number"
              placeholder="Cena"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="1"
          />
          <input
              type="number"
              placeholder="Liczba stron"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              min="1"
          />
          <div className="cover-group">
            <label className="cover-label">Typ okładki:</label>
            <div className="cover-options">
              <label>
                <input
                    type="radio"
                    name="cover"
                    value="Twarda okładka"
                    checked={type === "Twarda okładka"}
                    onChange={(e) => setType(e.target.value)}
                />
                <span>Twarda</span>
              </label>
              <label>
                <input
                    type="radio"
                    name="cover"
                    value="Miekka okładka"
                    checked={type === "Miekka okładka"}
                    onChange={(e) => setType(e.target.value)}
                />
                <span>Miękka</span>
              </label>
            </div>
          </div>
          <button type="submit">{bookId ? "Zapisz zmiany" : "Dodaj książkę"}</button>
        </form>
      </main>
  );
}
