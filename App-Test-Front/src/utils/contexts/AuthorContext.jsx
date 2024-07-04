import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  // Etat pour stocker les informations de l'utilisateur connecté
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    initAuthors();
  }, []);

  const initAuthors = () => {
    axios
      .get("http://localhost:8080/api/authors")
      .then((response) => {
        setAuthors(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const createAuthor = (author) => {
    axios
      .post("http://localhost:8080/api/authors", author)
      .then((response) => setAuthors(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <AuthorContext.Provider value={{ createAuthor, authors }}>
      {children}
    </AuthorContext.Provider>
  );
};
