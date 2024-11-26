const productsController = {};


productsController.getProducts = (req, res)=> res.json({message: []});
productsController.createProducts = (req, res)=> res.json({message: ["Product saved"]});
productsController.updateProducts = (req, res)=> res.json({message: ["Product updated"]});
productsController.deleteProducts = (req, res)=> res.json({message: ["Product deleted"]});
productsController.getProduct = (req, res)=> res.json({message: ["Product with id 1"]});






export default productsController;