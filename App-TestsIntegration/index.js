const express = require("express");
const cors = require("cors");
//nodeJs API
const app = express();
//on instancie l'app
const livresRoutes = require("./routes/livres.route.js");
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
//permettre de gérer les objets JSO dans l'API
app.use("/api/livres", livresRoutes);
//nous séparons les routes ainsi chaque requête
//par une route passant par l'API
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`nous sommes sur le port : ${PORT}`);
});
