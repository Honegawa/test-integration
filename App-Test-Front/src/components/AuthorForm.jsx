import { useContext, useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import "../styles/AuthorForm.css";
import { AuthorContext } from "../utils/contexts/AuthorContext";

function AuthorForm() {
  const [author, setAuthor] = useState({ firstname: "", lastname: "" });
  const { createAuthor } = useContext(AuthorContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    createAuthor(author);
  };

  return (
    <>
      <form id="author-form">
        <Stack
          spacing={8}
          sx={{
            width: "50%",
            minWidth: 200,
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Prénom</FormLabel>
              <Input
                value={author.firstname}
                onChange={(e) =>
                  setAuthor({ ...author, firstname: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Input
                value={author.lastname}
                onChange={(e) =>
                  setAuthor({ ...author, lastname: e.target.value })
                }
              />
            </FormControl>
          </Stack>
          <Button onClick={handleSubmit}>Créer</Button>
        </Stack>
      </form>
    </>
  );
}

export default AuthorForm;
