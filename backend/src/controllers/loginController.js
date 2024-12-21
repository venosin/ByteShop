import clientsModel from "../models/Client.js";
import employeesModel from "../models/Employees.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

// CREATE: Login para clientes y empleados
loginController.login = async (req, res) => {
  const { email, password } = req.body;

  // Validación de campos requeridos
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Buscar primero en la colección de clientes
    let userFound = await clientsModel.findOne({ email });
    let userType = "client"; 

    // Si no es un cliente, buscar en la colección de empleados
    if (!userFound) {
      userFound = await employeesModel.findOne({ email });
      userType = "employee"; 
    }

    // Si no se encuentra en ninguna colección, devolver error
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validar la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generar el token JWT
    jwt.sign(
      {
        id: userFound._id,
        userType,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error generating token" });
        }

        // Guardar el token en una cookie
        res.cookie("authToken", token, { httpOnly: true });
        res.status(200).json({ message: `${userType} login successful`, token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export default loginController;
