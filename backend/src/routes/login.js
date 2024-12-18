import express from "express";
const router = express.Router();

import loginController from "../controllers/loginController.js";

router.route("/").get(loginController.login);

export default router;
