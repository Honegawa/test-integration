import express from "express";
import request from "supertest";
import authorRoutes from "../../routes/author.route.js";

const app = express();

app.use(express.json());

app.use("/api/authors", authorRoutes);

beforeAll(async () => {
  await request(app)
    .post("/api/authors")
    .send({ firstname: "firstname", lastname: "lastname" });
});
describe("Integration tests for Author route", () => {
  describe("GET /api/authors", () => {
    it("shoud get all authors with the command GET /api/authors", async () => {
      const { body, statusCode } = await request(app).get("/api/authors");
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            firstname: expect.any(String),
            lastname: expect.any(String),
          }),
        ])
      );
      expect(statusCode).toBe(200);
    });

    it("shoud get an author with the command GET /api/authors/:id", async () => {
      const { body, statusCode } = await request(app).get("/api/authors/1");
      expect(body).toEqual({
        id: expect.any(Number),
        firstname: expect.any(String),
        lastname: expect.any(String),
      });
      expect(statusCode).toBe(200);
    });

    it("shoud return failure on invalid parameter on /api/authors/:id", async () => {
      const { body, statusCode } = await request(app).get("/api/authors/99");
      expect(body).toEqual({
        message: "Author not found",
      });
      expect(statusCode).toBe(404);
    });
  });

  describe("POST /api/authors", () => {
    it("shoud return success on valid post body on /API/authors", async () => {
      const { body, statusCode } = await request(app)
        .post("/api/authors")
        .send({
          firstname: "prenom",
          lastname: "nom",
        });
      expect(statusCode).toBe(201);
      expect(body).toEqual({
        message: "Author has been created!",
        author: {
          firstname: "prenom",
          lastname: "nom",
          id: expect.any(Number),
        },
      });
    });

    it("should return failure on invalid post body on /API/authors", async () => {
      const { body, statusCode } = await request(app)
        .post("/api/authors")
        .send({
          firstname: "",
          lastname: "",
        });
      expect(statusCode).toBe(400);
      expect(body).toEqual({
        errors: [
          {
            type: "field",
            value: "",
            msg: "Firstname shouldn't be empty",
            path: "firstname",
            location: "body",
          },
          {
            type: "field",
            value: "",
            msg: "Lastname shouldn't be empty",
            path: "lastname",
            location: "body",
          },
        ],
      });
    });
  });

  describe("PUT /api/authors/:id", () => {
    it("should return success on valid put body on /API/authors/:id", async () => {
      const { body, statusCode } = await request(app)
        .put("/api/authors/1")
        .send({
          firstname: "firstname update",
          lastname: "lastname update",
        });
      expect(statusCode).toBe(200);
      expect(body).toEqual({
        message: "Author has been updated",
        author: {
          firstname: "firstname update",
          lastname: "lastname update",
          id: 1,
        },
      });
    });

    it("should return failure on invalid put body on /API/authors", async () => {
      const { body, statusCode } = await request(app)
        .put("/api/authors/1")
        .send({
          firstname: "",
          lastname: "",
        });
      expect(statusCode).toBe(400);
      expect(body).toEqual({
        errors: [
          {
            type: "field",
            value: "",
            msg: "Firstname shouldn't be empty",
            path: "firstname",
            location: "body",
          },
          {
            type: "field",
            value: "",
            msg: "Lastname shouldn't be empty",
            path: "lastname",
            location: "body",
          },
        ],
      });
    });

    it("should return failure on invalid put param on /API/authors/:id", async () => {
      const { body, statusCode } = await request(app)
        .put("/api/authors/99")
        .send({
          firstname: "firstname update",
          lastname: "lastname update",
        });
      expect(statusCode).toBe(404);
      expect(body).toEqual({
        message: "Author not found",
      });
    });
  });

  describe("DELETE /api/authors/:id", () => {
    it("should return success on valid delete on /API/authors/:id", async () => {
      const { body, statusCode } = await request(app).delete("/api/authors/1");
      expect(statusCode).toBe(200);
      expect(body).toEqual({ message: "Author has been deleted" });
    });

    it("should return failure on invalid delete param on /API/authors/:id", async () => {
      const { body, statusCode } = await request(app).delete("/api/authors/99");
      expect(statusCode).toBe(404);
      expect(body).toEqual({ message: "Author not found" });
    });

    it("should return success on valid delete on /API/authors/:id and delete Books on Cascade", async () => {
      await request(app)
        .post("/api/authors")
        .send({ firstname: "firstname", lastname: "lastname" });

      await request(app).post("/api/books").send({
        title: "title",
        publicationDate: "2024-07-03T13:15:13.481Z",
        AuthorId: 2,
      });

      const { body, statusCode } = await request(app).delete("/api/authors/2");
      expect(statusCode).toBe(200);
      expect(body).toEqual({ message: "Author has been deleted" });
    });
  });
});
