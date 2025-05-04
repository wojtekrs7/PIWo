import { useContext, useState } from "react";
import { BooksContext } from "../Contexts/BooksContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta() {
  return [
    { title: "New Book" },
    { name: "description", content: "Add book to bookshop" },
  ];
}



export default function New() {
  const { bookList, setBookList } = useContext(BooksContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const [type, setType] = useState("Twarda okładka");
  const navigate = useNavigate();

    useEffect(() => {
        const storedBook = localStorage.getItem("book-to-edit");
        if (storedBook) {
        const parsed = JSON.parse(storedBook);
        setTitle(parsed.title || "");
        setAuthor(parsed.author || "");
        setPrice(parsed.price || "");
        setPages(parsed.pages || "");
        setType(parsed.type || "Twarda okładka");
        localStorage.removeItem("book-to-edit");
        }
    }, []);
  
  const handleNewBook = (e) => {
    e.preventDefault();
    if (!title || !author || price === "" || pages === "") return;

    const newBook = {
      id: bookList.length + 1,
      title,
      author,
      price: parseFloat(price),
      pages: parseInt(pages),
      type,
    };

    setBookList((prev) => [...prev, newBook]);
    navigate("/"); // ← jeśli chcesz wrócić po dodaniu
  };

  return (
    <main className="list-vertical">
      <form className="list-vertical">
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
        <button onClick={handleNewBook}>Add</button>
      </form>
    </main>
  );
}
