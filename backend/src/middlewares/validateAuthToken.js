import jwt from "jsonwebtoken";
import {config} from '../config.js'

export const validateAuthToken = (req, res, next) => {
  try {
    // Validar si existen cookies
    if (!req.cookies) {
      return res.status(401).json({ message: "No cookies found, authorization required" });
    }

    // Extraer el token de las cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Token not provided, unauthorized" });
    }

    // Verificar el token
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;

    next(); // Continuar al siguiente middleware o controlador
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired, please log in again" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }

    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
