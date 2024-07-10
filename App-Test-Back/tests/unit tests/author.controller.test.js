import authorCtrl from "../../controllers/author.controller.js";
import { Author } from "../../models/index.js";
import { jest } from "@jest/globals";

jest.mock("../../models/index.js");

describe("Unit tests for Author controller", () => {
  let req, res;

  const mockAuthors = [
    { id: 1, firstname: "firstname1", lastname: "lastname1" },
    { id: 2, firstname: "firstname2", lastname: "lastname2" },
    { id: 3, firstname: "firstname3", lastname: "lastname3" },
  ];

  describe("getAll", () => {
    beforeEach(() => {
      req = {};
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return a list of authors", async () => {
      jest.spyOn(Author, "findAll").mockResolvedValue(mockAuthors);
      await authorCtrl.getAll(req, res);
      expect(Author.findAll).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAuthors);
    });

    it("should return a 500 status code if an error occurs", async () => {
      jest.spyOn(Author, "findAll").mockRejectedValue(new Error());
      await authorCtrl.getAll(req, res);
      expect(Author.findAll).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Error in fetching author",
      });
    });
  });

  describe("getById", () => {
    beforeEach(() => {
      req = {
        params: {
          id: 1,
        },
      };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return an author", async () => {
      jest.spyOn(Author, "findByPk").mockResolvedValue(mockAuthors[0]);
      await authorCtrl.getById(req, res);
      expect(Author.findByPk).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAuthors[0]);
    });

    it("should return a 404 status code if author id doesn't exist", async () => {
      const invalidParams = { params: { id: 99 } };
      await authorCtrl.getById(invalidParams, res);
      expect(Author.findByPk).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Author not found" });
    });

    it("should return a 500 status code if an error occurs", async () => {
      jest.spyOn(Author, "findByPk").mockRejectedValue(new Error());
      await authorCtrl.getById(req, res);
      expect(Author.findByPk).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Error in fetching author",
      });
    });
  });

  describe("create", () => {
    beforeEach(() => {
      req = {
        body: {
          firstname: "new firstname",
          lastname: "new lastname",
        },
      };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should create an author and return it", async () => {
      jest.spyOn(Author, "create").mockResolvedValue({
        id: 4,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      await authorCtrl.create(req, res);
      expect(Author.create).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Author has been created!",
        author: {
          id: 4,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        },
      });
    });

    it("shoud return a 500 response if body is invalid", async () => {
      const invalidBody = {
        body: {
          firstname: "",
          lastname: "",
        },
      };

      jest.spyOn(Author, "create").mockRejectedValue(new Error());
      await authorCtrl.create(invalidBody, res);
      expect(Author.create).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Error in creating author",
      });
    });
  });

  describe("updateById", () => {
    beforeEach(() => {
      req = {
        body: {
          firstname: "update firstname",
          lastname: "update lastname",
        },
        params: {
          id: 1,
        },
      };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should update an author and return it", async () => {
      const selectedAuthor = {
        id: mockAuthors[0].id,
        firstname: mockAuthors[0].firstname,
        lastname: mockAuthors[0].lastname,
      };
      const buildAuthor = Author.build(selectedAuthor);
      jest.spyOn(Author, "findByPk").mockResolvedValue(buildAuthor);

      await authorCtrl.updateById(req, res);
      expect(Author.findByPk).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Author has been updated",
        author: {
          id: 1,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        },
      });
    });
  });
});
