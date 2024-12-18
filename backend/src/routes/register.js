import express from "express";
const router = express.Router();

import registerController from "../controllers/registerController.js";

router.route("/").post(registerController.register);

export default router;
