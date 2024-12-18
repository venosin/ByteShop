const registerController = {};
import clientsModel from "../models/Client.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// CREATE: Crea un nuevo modelo
registerController.register = async (req, res) => {
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
      jwt.sign({
        id: newClient._id
      },"secret123",
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if(err) console.log(err)
        res.cookie('token', token)
        res.status(201).json({ message: "Client register"});
      }
    )
     
    } catch (error) {
      res.status(500).json({ message: "Error", error: error.message });
    }
};

export default registerController;