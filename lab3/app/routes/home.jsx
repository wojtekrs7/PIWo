import { useContext, useState } from "react";
import { BooksContext } from "../Contexts/BooksContext.jsx";
import { useNavigate } from "react-router";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../src/firebase";
import { AuthContext } from "../Contexts/AuthContext.jsx";



export function meta() {
  return [
    { title: "BookZone" },
    { name: "description", content: "Website for internet bookshop" },
  ];
}

export default function Home() {
  
  const navigate = useNavigate();
  const { bookList, setBookList } = useContext(BooksContext);
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPages, setMinPages] = useState("");
  const [coverType, setCoverType] = useState("");
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const { user } = useContext(AuthContext);


  const handleDelete = async (id) => {
      if (!confirm("Czy na pewno chcesz usunąć tę książkę?")) return;
      try {
        await deleteDoc(doc(db, "books", id));
        setBookList((prev) => prev.filter((book) => book.id !== id));
      } catch (err) {
        alert("Błąd usuwania: " + err.message);
      }
  };


  const handleEdit = (book) => {
    setBookList((prev) => prev.filter((b) => b.id !== book.id));
    localStorage.setItem("book-to-edit", JSON.stringify(book));
    navigate("/new");
  };

  
  const bookListHTML = bookList
    .filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    )
    .filter((book) =>
      author ? book.author.toLowerCase().includes(author.toLowerCase()) : true
    )
    .filter((book) =>
      minPrice ? book.price >= parseFloat(minPrice) : true
    )
    .filter((book) =>
      maxPrice ? book.price <= parseFloat(maxPrice) : true
    )
    .filter((book) =>
      minPages ? book.pages >= parseInt(minPages) : true
    )
    .filter((book) =>
      coverType ? book.type === coverType : true
    )
    .filter((book) =>
        showOnlyMine && user ? book.userId === user.uid : true
    )
    .map((book) => (
      <article key={book.id} className="list-horizontal">
        <div className="flex flex-col gap-1">
          <span>
            <strong>{book.title}</strong> – {book.author} – {book.type} – {book.price?.toFixed(2)} zł
          </span>
            {user?.uid === book.userId && (
                <div className="flex gap-2">
                    <button className="edit-button" onClick={() => handleEdit(book)}>
                        Edytuj
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => handleDelete(book.id)}
                    >
                        Usuń
                    </button>
                </div>)}
        </div>
      </article>
    ));

    return (
      <main className="page-layout">
        <aside className="filters">
          <input placeholder="Szukaj po tytule" onChange={(e) => setQuery(e.target.value)} autoFocus />
          <input placeholder="Autor" onChange={(e) => setAuthor(e.target.value)} />
          <input type="number" placeholder="Min. cena" onChange={(e) => setMinPrice(e.target.value)} />
          <input type="number" placeholder="Max. cena" onChange={(e) => setMaxPrice(e.target.value)} />
          <input type="number" placeholder="Min. liczba stron" onChange={(e) => setMinPages(e.target.value)} />
          <select onChange={(e) => setCoverType(e.target.value)}>
            <option value="">Typ okładki (dowolny)</option>
            <option value="Twarda okładka">Twarda</option>
            <option value="Miekka okładka">Miękka</option>
          </select>
          {user && (
              <label style={{ display: "flex", alignItems: "center", gap: "0.5em", marginTop: "1rem" }}>
                <input
                    type="checkbox"
                    checked={showOnlyMine}
                    onChange={(e) => setShowOnlyMine(e.target.checked)}
                    style={{ width: "16px", height: "16px" }}
                />
                Tylko moje książki
              </label>
          )}
        </aside>
        <section className="results">
          {bookListHTML}
        </section>
      </main>
    );
    
}