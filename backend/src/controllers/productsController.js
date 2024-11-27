/*
* Este archivo define los controladores para gestionar las operaciones CRUD
* (Crear, Leer, Actualizar y Eliminar) de productos en la base de datos.
* 
* Se utilizan los métodos de Mongoose para interactuar con la base de datos MongoDB.
* Las operaciones están asociadas a endpoints o rutas
*
* TODO: Validar que el id de la categoría exista antes de guardar un producto.
*/

const productsController = {};
import productsModel from "../models/Product.js";

// SELECT
productsController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

// SELECT
productsController.getProduct = async (req, res) => {
  const products = await productsModel.findById(req.params.id);
  res.json(products);
};

//CREATE
productsController.createProducts = async (req, res) => {
  const { name, price, category, stock, image } = req.body;
  const newProduct = new productsModel({
    name: name,
    price: price,
    category: category,
    stock: stock || 0,
    image: image,
  });

  // Guardar el producto en la base de datos
  await newProduct.save();

  // Responder con éxito
  res.status(201).json({ message: "Producto guardado" });
};

// UPDATE
productsController.updateProducts = async (req, res) => {
  const { name, price, category, stock, image } = req.body;
  await productsModel.findByIdAndUpdate(req.params.id, {
    name: name,
    price: price,
    category: category,
    stock: stock || 0,
    image: image,
  });
  res.json({ message: ["Categories updated"] });
};

// DELETE
productsController.deleteProducts = async (req, res) => {
  await categoriesModel.findByIdAndDelete(req.params.id);
  res.json({ message: ["Categories deleted"] });
};

export default productsController;
