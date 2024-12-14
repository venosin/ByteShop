import clientsModel from "../models/Client.js";

const clientsController = {};

// OBTENER TODOS LOS CLIENTES
clientsController.getClients = async (req, res) => {
  try {
    const clients = await clientsModel.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes", error: error.message });
  }
};

// OBTENER UN CLIENTE POR ID
clientsController.getClient = async (req, res) => {
  try {
    const client = await clientsModel.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente", error: error.message });
  }
};

// CREAR UN CLIENTE
clientsController.createClients = async (req, res) => {
  const { name, lastName, email, password, telephone, dui } = req.body;

  // Validación de campos requeridos
  if (!name || !lastName || !email || !password || !telephone) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const newClient = new clientsModel({
      name,
      lastName,
      email,
      password,
      telephone,
      dui: dui || null, // Si no se envía DUI, se establece como null
    });

    await newClient.save();
    res.status(201).json({ message: "Cliente creado con éxito", client: newClient });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el cliente", error: error.message });
  }
};

// ACTUALIZAR UN CLIENTE
clientsController.updateClients = async (req, res) => {
  const { name, lastName, email, password, telephone, dui } = req.body;

  // Validación de campos requeridos
  if (!name || !lastName || !email || !password || !telephone) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const updatedClient = await clientsModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        email,
        password,
        telephone,
        dui: dui || null, // Si no se envía DUI, se establece como null
      },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente actualizado con éxito", client: updatedClient });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el cliente", error: error.message });
  }
};

// ELIMINAR UN CLIENTE
clientsController.deleteClients = async (req, res) => {
  try {
    const deletedClient = await clientsModel.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json({ message: "Cliente eliminado con éxito", client: deletedClient });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error: error.message });
  }
};

export default clientsController;
