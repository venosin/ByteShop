const registerClientController = {};
import clientsModel from "../models/Client.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {config} from '../config.js'

// CREATE: Crea un nuevo modelo
registerClientController.register = async (req, res) => {
    const { name, lastName, email, password, telephone, dui } = req.body;
  
    // Validación de campos requeridos
    if (!name || !lastName || !email || !password || !telephone) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {

        const passwordHash = await bcrypt.hash(password, 10)

      const newClient = new clientsModel({
        name,
        lastName,
        email,
        password: passwordHash,
        telephone,
        dui: dui || null, // Si no se envía DUI, se establece como null
      });
  
 

      await newClient.save();
      
      // TODO: mejorar la manera de guardar el token
      // PD: El token en el registro es para entrar a la app de manera inmmediata luego de registrarme
      // Si después de registrar al usuario se necesita verificar por correo o iniciar sesión no es necesario el token aqui
      jwt.sign({
        id: newClient._id
      }, config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      },
      (err, token) => {
        if(err) console.log(err)
        res.cookie('authToken', token)
        res.status(201).json({ message: "Client register"});
      }
    )
     
    } catch (error) {
      res.status(500).json({ message: "Error", error: error.message });
    }
};

export default registerClientController;