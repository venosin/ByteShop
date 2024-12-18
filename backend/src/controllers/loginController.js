const loginController = {};
import clientsModel from "../models/Client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// CREATE: Crea un nuevo modelo
loginController.login = async (req, res) => {
  const { email, password } = req.body;

  // Validación de campos requeridos
  if ( !email || !password ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userFound = await clientsModel.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(404).json({ message: "Invalid password" });

    // TODO: mejorar la manera de guardar el token
    jwt.sign(
      {
        id: userFound._id,
      },
      "secret123",
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) console.log(err);
        res.cookie("token", token);
        res.status(201).json({ message: "Client login" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export default loginController;
