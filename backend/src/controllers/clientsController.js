const clientsController = {};


clientsController.getclients = (req, res)=> res.json({message: []});
clientsController.createclients = (req, res)=> res.json({message: ["Client saved"]});
clientsController.updateclients = (req, res)=> res.json({message: ["Client updated"]});
clientsController.deleteclients = (req, res)=> res.json({message: ["Client deleted"]});
clientsController.getClient = (req, res)=> res.json({message: ["Client with id 1"]});






export default clientsController;