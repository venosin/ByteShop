import express from "express";
const router = express.Router();

import clientsController from "../controllers/clientsController.js";

router.route("/")
  .get(clientsController.getclients)
  .post(clientsController.createclients);

router.route("/:id")
  .get(clientsController.getClient)
  .put(clientsController.updateclients)
  .delete(clientsController.deleteclients);

export default router;
