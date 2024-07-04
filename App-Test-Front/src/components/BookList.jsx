import "../styles/BookList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/joy/Table";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import BookUpdateModal from "./BookUpdateModal";
import BookCreateModal from "./BookCreateModal";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!loading) {
      axios
        .get("http://localhost:8080/api/books")
        .then((response) => {
          setBooks(response.data);
          setLoading(true);
        })
        .catch((error) => setError(error));
    }
  }, [loading]);

  const handleOpenModal = (book) => {
    setOpen(true);
    setBook(book);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setBook(null);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/books/${id}`).then(() => {
      setBooks(books.filter((book) => book.id !== id));
    });
  };

  const handleCreateSubmitModal = (book) => {
    axios.post("http://localhost:8080/api/books", book).then((response) => {
      const newBook = response.data.book;
      console.log(newBook);
      setLoading(false);
      setOpen(false);
      setBook(null);
    });
  };

  const handleUpdateSubmitModal = (book) => {
    axios
      .put(`http://localhost:8080/api/books/${book.id}`, book)
      .then((response) => {
        const newBook = response.data.book;
        console.log(newBook);
        setLoading(false);
        setOpen(false);
        setBook(null);
      });
  };

  return (
    <>
      <Sheet className="book-list-sheet">
        <Sheet
          sx={{
            "--TableCell-height": "40px",
            // the number is the amount of the header rows.
            "--TableHeader-height": "calc(1 * var(--TableCell-height))",
            height: 500,
            overflow: "auto",
            flexGrow: 2,
          }}
        >
          <Table hoverRow stickyHeader sx={{ flexGrow: 2 }}>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Auteur</th>
                <th>Date parution</th>
                <th style={{ width: "200px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan="3">Erreur lors de la récupération des books</td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{`${book.Author.firstname} ${book.Author.lastname}`}</td>
                    <td>{new Date(book.publicationDate).toLocaleDateString()}</td>
                    <td className="book-list-actions">
                      <Button onClick={() => handleOpenModal(book)}>
                        Modifier
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => handleDelete(book.id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Sheet>
        <Button
          color="success"
          className="create-button"
          sx={{ margin: "10px" }}
          onClick={() => setOpen(true)}
        >
          Create
        </Button>
      </Sheet>

      {book ? (
        <BookUpdateModal
          open={open}
          onClose={handleCloseModal}
          onSubmit={handleUpdateSubmitModal}
          book={book}
        />
      ) : (
        <BookCreateModal
          open={open}
          onClose={handleCloseModal}
          onSubmit={handleCreateSubmitModal}
        />
      )}
    </>
  );
}

export default BookList;
