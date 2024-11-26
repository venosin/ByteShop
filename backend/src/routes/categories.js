import express from "express";
const router = express.Router();
import categoriesController from '../controllers/categoriesController.js';

router.route("/")
  .get(categoriesController.getcategories)
  .post(categoriesController.createcategories);

router.route("/:id")
  .get(categoriesController.getCategorie)
  .put(categoriesController.updatecategories)
  .delete(categoriesController.deletecategories);

export default router;