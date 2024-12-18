const logoutController = {};
import clientsModel from "../models/Client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// CREATE: Crea un nuevo modelo
logoutController.logout = async (req, res) => {
 res.cookie('token', "", {
    expires: new Date(0)
 })
 return res.sendStatus(200)
};

export default logoutController;
