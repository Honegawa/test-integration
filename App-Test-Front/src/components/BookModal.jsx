import { useContext, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { AuthorContext } from "../utils/contexts/AuthorContext";

function BookModal({ open, onClose, onSubmit, book }) {
  const { authors } = useContext(AuthorContext);
  const [currentBook, setCurrentBook] = useState(
    book || {
      AuthorId: -1,
      title: "",
      publicationDate: "",
      Author: { firstname: "", lastname: "" },
    }
  );

  const handleSelect = (event, newValue) => {
    setCurrentBook({ ...currentBook, AuthorId: newValue });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <DialogTitle>
          {book ? "Modifier un livre" : "Ajouter un livre"}
        </DialogTitle>
        <DialogContent>
          <form>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Titre</FormLabel>
                <Input
                  value={currentBook?.title || ""}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, title: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Auteur</FormLabel>
                <Select onChange={handleSelect} value={currentBook.AuthorId}>
                  {authors.map((author) => (
                    <Option
                      key={author.id}
                      value={author.id}
                    >{`${author.firstname} ${author.lastname}`}</Option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Date de parution</FormLabel>
                <Input
                  type="date"
                  value={currentBook.publicationDate.slice(0, 10)}
                  onChange={(e) =>
                    setCurrentBook({
                      ...currentBook,
                      publicationDate: new Date(e.target.value).toISOString(),
                    })
                  }
                />
              </FormControl>
              <Button
                onClick={() => onSubmit(currentBook)}
                disabled={
                  currentBook.AuthorId === -1 ||
                  currentBook.title === "" ||
                  currentBook.publicationDate === ""
                }
              >
                {book ? "Modifier" : "Ajouter"}
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

export default BookModal;
