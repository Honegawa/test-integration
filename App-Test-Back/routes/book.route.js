import express from "express";
import { check } from "express-validator";
import bookCtrl from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", bookCtrl.getAll);
router.get("/:id", bookCtrl.getById);
router.post(
  "/",
  [
    check("title", "Title shouldn't be empty").not().isEmpty(),
    check("publicationDate", "PublicationDate shouldn't be empty")
      .not()
      .isEmpty(),
    check("AuthorId", "AuthorId shouldn't be empty").not().isEmpty(),
  ],
  bookCtrl.create
);
router.put(
  "/:id",
  [
    check("title", "Title shouldn't be empty").not().isEmpty(),
    check("publicationDate", "PublicationDate shouldn't be empty")
      .not()
      .isEmpty(),
    check("AuthorId", "AuthorId shouldn't be empty").not().isEmpty(),
  ],
  bookCtrl.updateById
);
router.delete("/:id", bookCtrl.deleteById);

export default router;
