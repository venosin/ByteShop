const loginController = {};
//import registerModel from "../models/Client.js";

// CREATE: Crea un nuevo modelo
loginController.login = async (req, res) => {

    res.json({ message: ["login"] });
  
};
export default loginController;