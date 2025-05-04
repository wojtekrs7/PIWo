import { createContext, useState } from "react";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [bookList, setBookList] = useState([
    {
      id: 1,
      title: "Wiersze",
      type: "Twarda okładka",
      author: "Jan Brzechwa",
      price: 59.99,
      pages: 120,
    },
    {
      id: 2,
      title: "W pustyni i w puszczy",
      type: "Twarda okładka",
      author: "Henryk Sienkiewicz",
      price: 90,
      pages: 450,
    },
    {
      id: 3,
      title: "Dziady cz. III",
      type: "Miekka okładka",
      author: "Adam Mickiewicz",
      price: 35,
      pages: 90,
    },
    {
      id: 4,
      title: "Dziady cz. IV",
      type: "Miekka okładka",
      author: "Adam Mickiewicz",
      price: 39.99,
      pages: 65,
    },
    {
      id: 5,
      title: "Harry Potter i Kamień Filozoficzn",
      type: "Twarda okładka",
      author: "J.K. Rowling",
      price: 72,
      pages: 320,
    },
  ]);

  return (
    <BooksContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BooksContext.Provider>
  );
};