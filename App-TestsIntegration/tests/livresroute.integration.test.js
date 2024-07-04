const express = require("express");
const request = require("supertest");
const livresRoute = require("../routes/livres.route");
const livresData = require("../data/livres.json");
const { save } = require("../services/save.service");
const Livre = require("../models/livre");
//comme on teste une API on besoin de connaître la route o
//pour y accéder
const app = express();
//on instancie une application
app.use(express.json());
//on crée un middleware vers le serveur
app.use("/api/livres", livresRoute);
//on accède à l'API via la route
/* on écrit la procédure de test qui nous évitera de passer à
chaque fois par des outils de test tels que Postman*/

beforeEach(() => {
  save(livresData);
});
describe("test d'intégration pour l'API livres", () => {
  describe("GET /api/livres", () => {
    it("shoud get all books with th command GET /api/livres", async () => {
      const { body, statusCode } = await request(app).get("/api/livres");
      expect(body).toEqual(
        //le rendu est un tableau puisqu'il s'agit de récupérer les livres
        expect.arrayContaining([
          //le rendu est un tableau d'objets
          expect.objectContaining({
            id: expect.any(Number),
            titre: expect.any(String),
            auteur: expect.any(String),
          }),
        ])
      );
      expect(statusCode).toBe(200);
    });
  });

  describe("POST /api/livres", () => {
    it("shoud return success on valid post body on /API/livres", async () => {
      const { body, statusCode } = await request(app).post("/api/livres").send({
        titre: "La dame aux Camélia",
        auteur: "Alexandre Dumas fils",
      });
      expect(statusCode).toBe(200);
      expect(body).toEqual({
        message: "Succès",
        livre: {
          titre: "La dame aux Camélia",
          auteur: "Alexandre Dumas fils",
          id: Livre.initID - 1,
        },
      });
    });

    it("should return failure on invalid post body on /API/livres", async () => {
      const { body, statusCode } = await request(app).post("/api/livres").send({
        titre: "",
        auteur: "",
      });
      expect(statusCode).toBe(400);
      expect(body).toEqual({
        errors: [
          {
            type: "field",
            value: "",
            msg: "le titre du livre est obligatoire",
            path: "titre",
            location: "body",
          },
          {
            type: "field",
            value: "",
            msg: "l'auteur du livre est obligatoire",
            path: "auteur",
            location: "body",
          },
        ],
      });
    });
  });

  describe("PUT /api/livres/:id", () => {
    it("should return success on valid put body on /API/livres/:id", async () => {
      const { body, statusCode } = await request(app)
        .put("/api/livres/4")
        .send({
          titre: "Titre update",
          auteur: "Auteur update",
        });
      expect(statusCode).toBe(201);
      expect(body).toEqual({
        message: "Succès",
        livre: {
          titre: "Titre update",
          auteur: "Auteur update",
          id: 4,
        },
      });
    });

    it("should return failure on invalid put body on /API/livres", async () => {
      const { body, statusCode } = await request(app)
        .put("/api/livres/4")
        .send({
          titre: "",
          auteur: "",
        });
      expect(statusCode).toBe(400);
      expect(body).toEqual({
        errors: [
          {
            type: "field",
            value: "",
            msg: "le titre du livre est obligatoire",
            path: "titre",
            location: "body",
          },
          {
            type: "field",
            value: "",
            msg: "l'auteur du livre est obligatoire",
            path: "auteur",
            location: "body",
          },
        ],
      });
    });

    it("should return failure on invalid put param on /API/livres/:id", async () => {
      const { body, statusCode } = await request(app)
        .put("/api/livres/99")
        .send({
          titre: "Titre update",
          auteur: "Auteur update",
        });
      expect(statusCode).toBe(404);
    });
  });

  describe("DELETE /api/livres/:id", () => {
    it("should return success on valid delete on /API/livres/:id", async () => {
      const { body, statusCode } = await request(app).delete("/api/livres/1");
      expect(statusCode).toBe(200);
      expect(body).toEqual({
        message: "Succès",
      });
    });

    it("should return failure on invalid delete param on /API/livres/:id", async () => {
      const { body, statusCode } = await request(app).delete("/api/livres/99");
      expect(statusCode).toBe(404);
      expect(body).toEqual({
        error: true,
        message: "Livre non trouvé",
      });
    });
  });
});
