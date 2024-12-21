import express from "express";
const router = express.Router();

import registerClientController from "../controllers/registerClientController.js";

router.route("/").post(registerClientController.register);

export default router;
