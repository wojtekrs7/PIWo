import { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../src/firebase";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [bookList, setBookList] = useState([]);

  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const books = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setBookList(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
      <BooksContext.Provider value={{ bookList, setBookList, fetchBooks }}>
        {children}
      </BooksContext.Provider>
  );
};
