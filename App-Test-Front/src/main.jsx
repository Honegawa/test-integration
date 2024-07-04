import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthorProvider } from "./utils/contexts/AuthorContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthorProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthorProvider>
);
