import BookModal from "./BookModal";

function BookUpdateModal({ open, onClose, onSubmit, book }) {
  return (
    <BookModal
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      book={book}
    />
  );
}

export default BookUpdateModal;
