import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/Client.js";
import { sendEmail, HTMLRecoveryEmail } from "../utils/passwordRecoveryMail.js";
import { config } from "../config.js";

const passwordRecoveryController = {};

// Solicitar código de verificación
passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    // Validar que el email no esté vacío
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Buscar si el email existe en la base de datos
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generar un código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Crear token JWT con el correo del usuario y el código de 6 dígitos
    const token = jwt.sign({ email, code }, config.jwt.secret, { expiresIn: "15m" });

    // Guarda el token en una cookie
    res.cookie("tokenRecoveryCode", token, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    });

    // Enviar correo con el código
    await sendEmail(
      email,
      "Password Recovery Code",
      `Your verification code is: ${code}`,
      HTMLRecoveryEmail(code)
    );

    res.status(200).json({ message: "Verification code sent to email" });
  } catch (error) {
    res.status(500).json({
      message: "Error sending verification code",
      error: error.message,
    });
  }
};

// Verificar el código
passwordRecoveryController.verifyCode = (req, res) => {
  const { code } = req.body;

  try {
    // Validar que el código no esté vacío
    if (!code) return res.status(400).json({ message: "Code is required" });

    // Extraer el token de las cookies
    const token = req.cookies.tokenRecoveryCode;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token is missing, unauthorized" });
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, config.jwt.secret);


    // Verificar si el código es correcto
    if (decoded.code !== code) {
      return res.status(403).json({ message: "Invalid code" });
    }

    res.status(200).json({
      message: "Code verified successfully"
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Token expired, please request a new code" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Reestablecer la contraseña
passwordRecoveryController.resetPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    // Extraer el token de las cookies
    const token = req.cookies.tokenRecoveryCode;

    if (!token) {
      return res.status(401).json({ message: "Token is missing, unauthorized" });
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, config.jwt.secret);

    // Extraer el email del token
    const { email } = decoded;

    // Buscar al usuario por el email en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not updated" });

    // Eliminar la cookie después de usarla
    res.clearCookie("tokenRecoveryCode");

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Token expired, please request a new code" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }

    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
};

export default passwordRecoveryController;
