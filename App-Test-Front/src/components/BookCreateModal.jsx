import BookModal from "./BookModal";

function BookCreateModal({ open, onClose, onSubmit }) {
  return (
    <BookModal
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}

export default BookCreateModal;
