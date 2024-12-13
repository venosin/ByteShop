const clientsController = {};

import clientsModel from "../models/Client.js";

// OBTENER TODOS LOS USUARIOS
clientsController.getClients = async (req, res) => {
  const clients = await clientsModel.find();
  res.json(clients);
};

// OBTENER UN USUARIO POR ID
clientsController.getClient = async (req, res) => {
  const user = await clientsModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(user);
};

// CREAR UN USUARIO
clientsController.createClients = async (req, res) => {
  const { nombres, apellidos, correoElectronico, contrasena, telefono, dui } = req.body;
  const newUser = new clientsModel({
    nombres,
    apellidos,
    correoElectronico,
    contrasena,
    telefono,
    dui: dui || null, // Si no se envía DUI, se establece como null
  });

  await newUser.save();
  res.status(201).json({ message: "Usuario creado con éxito", user: newUser });
};

// ACTUALIZAR UN USUARIO
clientsController.updateClients = async (req, res) => {
  const { nombres, apellidos, correoElectronico, contrasena, telefono, dui } = req.body;
  const updatedUser = await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
      nombres,
      apellidos,
      correoElectronico,
      contrasena,
      telefono,
      dui: dui || null,
    },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json({ message: "Usuario actualizado con éxito", user: updatedUser });
};

// ELIMINAR UN USUARIO
clientsController.deleteClients = async (req, res) => {
  const deletedUser = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json({ message: "Usuario eliminado con éxito", user: deletedUser });
};

export default clientsController;
