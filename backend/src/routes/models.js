import express from "express";
const router = express.Router();
//en modelo agregue eso de validar el token

import modelsController from "../controllers/modelsController.js";
import { validateAuthToken } from "../middlewares/validateAuthToken.js"

router.route("/")
  .get(validateAuthToken(), modelsController.getModels) // 
  .post(validateAuthToken(), modelsController.createModels); 
router.route("/:id")
  .get(validateAuthToken(), modelsController.getModel)
  .put(validateAuthToken(), modelsController.updateModels)
  .delete(validateAuthToken(), modelsController.deleteModels);

export default router;

/*import express from "express";
const router = express.Router();

import modelsController from "../controllers/modelsController.js";

router.route("/")
  .get(modelsController.getModels)
  .post(modelsController.createModels);

router.route("/:id")
  .get(modelsController.getModel)
  .put(modelsController.updateModels)
  .delete(modelsController.deleteModels);

export default router;*/
/*
import express from "express";
const router = express.Router();
//en modelo agregue eso de validar el token

import modelsController from "../controllers/modelsController.js";
import { validateAuthToken } from "../middlewares/validateAuthToken.js"

router.route("/")
  .get(validateAuthToken(), modelsController.getModels) // ✅ protegido
  .post(validateAuthToken(), modelsController.createModels); // ✅ protegido

router.route("/:id")
  .get(validateAuthToken(), modelsController.getModel)
  .put(validateAuthToken(), modelsController.updateModels)
  .delete(validateAuthToken(), modelsController.deleteModels);

export default router;

*/