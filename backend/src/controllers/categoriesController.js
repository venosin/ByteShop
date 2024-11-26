const categoriesController = {};

categoriesController.getcategories = (req, res)=> res.json({message: []});
categoriesController.createcategories = (req, res)=> res.json({message: ["Categories saved"]});
categoriesController.updatecategories = (req, res)=> res.json({message: ["Categories updated"]});
categoriesController.deletecategories = (req, res)=> res.json({message: ["Categories deleted"]});
categoriesController.getCategorie = (req, res)=> res.json({message: ["Categories with id 1"]});

export default categoriesController;