import { Author, Book } from "../models/index.js";
import { validationResult } from "express-validator";

const getAll = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: {
        model: Author,
        attributes: ["firstname", "lastname"],
      },
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching book" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id, {
      include: {
        model: Author,
        attributes: ["firstname", "lastname"],
      },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching book" });
  }
};

const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { title, publicationDate, AuthorId } = req.body;

    const author = await Author.findByPk(AuthorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const book = await Book.create({ title, publicationDate, AuthorId });
    res.status(201).json({ message: "Book has been created!", book });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    
    const { id } = req.params;
    const { title, publicationDate, AuthorId } = req.body;

    const author = await Author.findByPk(AuthorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.update({ title, publicationDate, AuthorId }, { new: true });

    res.status(200).json({ message: "Book has been updated", book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in updating book" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.destroy();
    res.status(200).json({ message: "Book has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in deleting book" });
  }
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
