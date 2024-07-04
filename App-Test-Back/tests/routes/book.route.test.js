import express from "express";
import request from "supertest";
import authorRoutes from "../../routes/author.route.js";
import bookRoutes from "../../routes/book.route.js";

const app = express();

app.use(express.json());

app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);

beforeAll(async () => {
  await request(app)
    .post("/api/authors")
    .send({ firstname: "firstname", lastname: "lastname" });

  await request(app).post("/api/books").send({
    title: "title",
    publicationDate: "2024-07-03T13:15:13.481Z",
    AuthorId: 1,
  });
});

describe("Integration tests for Book route", () => {
  describe("GET /api/books", () => {
    it("shoud get all books with the command GET /api/books", async () => {
      const { body, statusCode } = await request(app).get("/api/books");
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            publicationDate: expect.any(String),
            AuthorId: expect.any(Number),
            Author: expect.objectContaining({
              firstname: expect.any(String),
              lastname: expect.any(String),
            }),
          }),
        ])
      );
      expect(statusCode).toBe(200);
    });

    it("shoud get an book with the command GET /api/books/:id", async () => {
      const { body, statusCode } = await request(app).get("/api/books/1");
      expect(body).toEqual({
        id: expect.any(Number),
        title: expect.any(String),
        publicationDate: expect.any(String),
        AuthorId: expect.any(Number),
        Author: expect.objectContaining({
          firstname: expect.any(String),
          lastname: expect.any(String),
        }),
      });
      expect(statusCode).toBe(200);
    });

    it("shoud return failure on invalid parameter on /api/books/:id", async () => {
      const { body, statusCode } = await request(app).get("/api/books/99");
      expect(body).toEqual({
        message: "Book not found",
      });
      expect(statusCode).toBe(404);
    });
  });

  describe("POST /api/books", () => {
    it("shoud return success on valid post body on /API/books", async () => {
      const { body, statusCode } = await request(app).post("/api/books").send({
        title: "new book",
        publicationDate: "2024-07-03T13:15:13.481Z",
        AuthorId: 1,
      });
      expect(statusCode).toBe(201);
      expect(body).toEqual({
        message: "Book has been created!",
        book: {
          id: expect.any(Number),
          title: "new book",
          publicationDate: "2024-07-03T13:15:13.481Z",
          AuthorId: 1,
        },
      });
    });

    it("should return failure on invalid post body (empty field) on /API/books", async () => {
      const { body, statusCode } = await request(app).post("/api/books").send({
        title: "",
        publicationDate: "",
        AuthorId: "",
      });
      expect(statusCode).toBe(400);
      expect(body).toEqual({
        errors: [
          {
            type: "field",
            value: "",
            msg: "Title shouldn't be empty",
            path: "title",
            location: "body",
          },
          {
            type: "field",
            value: "",
            msg: "PublicationDate shouldn't be empty",
            path: "publicationDate",
            location: "body",
          },
          {
            type: "field",
            value: "",
            msg: "AuthorId shouldn't be empty",
            path: "AuthorId",
            location: "body",
          },
        ],
      });
    });
  });

  describe("PUT /api/books/:id", () => {
    it("should return success on valid put body on /API/books/:id", async () => {
      const { body, statusCode } = await request(app).put("/api/books/1").send({
        title: "title update",
        publicationDate: "2024-07-03T13:15:13.481Z",
        AuthorId: 1,
      });
      expect(statusCode).toBe(200);
      expect(body).toEqual({
        message: "Book has been updated",
        book: {
          id: expect.any(Number),
          title: "title update",
          publicationDate: "2024-07-03T13:15:13.481Z",
          AuthorId: 1,
        },
      });
    });

    it("should return failure on invalid put body on /API/books", async () => {
      const { body, statusCode } = await request(app).put("/api/books/1").send({
        title: "",
        publicationDate: "",
        AuthorId: "",
      });
      expect(statusCode).toBe(400);
      expect(body).toEqual({
        errors: [
          {
            type: "field",
            value: "",
            msg: "Title shouldn't be empty",
            path: "title",
            location: "body",
          },
          {
            type: "field",
            value: "",
            msg: "PublicationDate shouldn't be empty",
            path: "publicationDate",
            location: "body",
          },
          {
            type: "field",
            value: "",
            msg: "AuthorId shouldn't be empty",
            path: "AuthorId",
            location: "body",
          },
        ],
      });
    });

    it("should return failure on invalid put param on /API/books/:id", async () => {
      const { body, statusCode } = await request(app)
        .put("/api/books/99")
        .send({
          title: "title update",
          publicationDate: "2024-07-03T13:15:13.481Z",
          AuthorId: 99,
        });
      expect(statusCode).toBe(404);
      expect(body).toEqual({
        message: "Author not found",
      });
    });
  });

  describe("DELETE /api/books/:id", () => {
    it("should return success on valid delete on /API/books/:id", async () => {
      const { body, statusCode } = await request(app).delete("/api/books/1");
      expect(statusCode).toBe(200);
      expect(body).toEqual({ message: "Book has been deleted" });
    });

    it("should return failure on invalid delete param on /API/books/:id", async () => {
      const { body, statusCode } = await request(app).delete("/api/books/99");
      expect(statusCode).toBe(404);
      expect(body).toEqual({ message: "Book not found" });
    });
  });
});
