import { Author } from "../models/index.js";
import { validationResult } from "express-validator";

const getAll = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching author" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching author" });
  }
};

const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { firstname, lastname } = req.body;

    const author = await Author.create({ firstname, lastname });
    res.status(201).json({ message: "Author has been created!", author });
  } catch (error) {
    res.status(500).json({ error: "Error in creating author" });
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
    const { firstname, lastname } = req.body;
    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    await author.update({ firstname, lastname }, { new: true });

    res.status(200).json({ message: "Author has been updated", author: author.dataValues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in updating author" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    await author.destroy();
    res.status(200).json({ message: "Author has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting author" });
  }
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
