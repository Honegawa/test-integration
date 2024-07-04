import express from "express";
import { check } from "express-validator";
import authorCtrl from "../controllers/author.controller.js";

const router = express.Router();

router.get("/", authorCtrl.getAll);
router.get("/:id", authorCtrl.getById);
router.post(
  "/",
  [
    check("firstname", "Firstname shouldn't be empty").not().isEmpty(),
    check("lastname", "Lastname shouldn't be empty").not().isEmpty(),
  ],
  authorCtrl.create
);
router.put(
  "/:id",
  [
    check("firstname", "Firstname shouldn't be empty").not().isEmpty(),
    check("lastname", "Lastname shouldn't be empty").not().isEmpty(),
  ],
  authorCtrl.updateById
);
router.delete("/:id", authorCtrl.deleteById);

export default router;
