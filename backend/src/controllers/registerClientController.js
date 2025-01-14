import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config.js";
import clientsModel from "../models/Client.js";
import nodemailer from "nodemailer"; // Para el envío de correos electrónicos
import crypto from "crypto"; // Para generar un código aleatorio

const registerClientController = {};

// CREATE: Registra un nuevo cliente y envía un código de verificación por correo
registerClientController.register = async (req, res) => {
  const { name, lastName, email, password, telephone, dui } = req.body;

  // Validación de campos requeridos
  if (!name || !lastName || !email || !password || !telephone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Verificar si el cliente ya existe
    const existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.status(409).json({ message: "Client already exists" }); // Código 409: Conflicto
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newClient = new clientsModel({
      name,
      lastName,
      email,
      password: passwordHash,
      telephone,
      dui: dui || null, // Si no se envía DUI, se establece como null
    });

    await newClient.save();

    // Generar un código de verificación único
    const verificationCode = crypto.randomBytes(3).toString("hex"); // Código corto
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 horas de expiración

    // Crear un JWT con el código y su expiración
    const tokenCode = jwt.sign(
      {
        email,
        verificationCode,
        expiresAt,
      },
      config.jwt.secret,
      { expiresIn: "2h" } // El JWT expirará en 2 horas
    );

    // Enviar correo electrónico con el código de verificación (JWT)
    const transporter = nodemailer.createTransport({
      service: "gmail", // Usa tu servicio de correo preferido
      auth: {
        user: config.email.email, // Tu correo electrónico
        pass: config.email.password, // La contraseña de la aplicación (asegúrate de usar una contraseña de app si usas Gmail)
      },
    });

    const mailOptions = {
      from: config.email.username, // Tu correo electrónico
      to: email,
      subject: "Verificación de correo electrónico",
      text: `Para verificar tu cuenta, utiliza el siguiente código de verificación: ${verificationCode}\nEste código expirará en 2 horas.\nSi no solicitaste este registro, por favor ignora este correo.`,
    };

    // Enviar correo
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
    });

    // Enviar una respuesta con el código de verificación
    res.status(201).json({
      message:
        "Client registered. Please verify your email with the code sent.",
      token: tokenCode, // Devolver el token para verificación posterior
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// Verificación del correo electrónico al recibir el token
registerClientController.verifyEmail = async (req, res) => {
  const { token } = req.body; // Este es el token JWT que el usuario recibe en el correo

  if (!token) {
    return res.status(400).json({ message: "Verification token is required" });
  }

  try {
    // Verificar y decodificar el JWT
    jwt.verify(token, config.jwt.secret, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Obtener la información decodificada del JWT
      const { email, verificationCode, expiresAt } = decoded;

      // Verificar si el token ha expirado
      if (Date.now() > expiresAt) {
        return res
          .status(400)
          .json({ message: "Verification token has expired" });
      }

      // Aquí puedes realizar alguna acción, por ejemplo, marcar al cliente como verificado
      // Buscar al cliente en la base de datos por su correo electrónico
      const client = await clientsModel.findOne({ email });

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      // Actualizar al cliente como verificado
      client.isVerified = true;
      await client.save();

      return res.status(200).json({ message: "Email verified successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export default registerClientController;
