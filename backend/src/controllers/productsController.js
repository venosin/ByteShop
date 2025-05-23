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
import { v2 as cloudinary } from "cloudinary";

// SELECT ALL PRODUCTS
productsController.getProducts = async (req, res) => {
  const products = await productsModel
    .find()
    .populate("idCategory")
    .populate("idBrand")
    .populate("idModel");
  res.json(products);
};

// SELECT PRODUCT BY ID
productsController.getProduct = async (req, res) => {
  const product = await productsModel
    .findById(req.params.id)
    .populate("idCategory")
    .populate("idBrand")
    .populate("idModel");
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.json(product);
};

// CREATE PRODUCT
productsController.createProducts = async (req, res) => {
  const {
    name,
    description,
    price,
    idCategory,
    stock,
    idBrand,
    idModel,
    discount,
  } = req.body;

  let imageURL = "";
  let imagePublicId = ""

  //Subir imagen a cloudinary
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "public",
      allowed_formats: ["jpg", "png", "jpeg"],
    });
    imageURL = result.secure_url;
    imagePublicId = result.public_id;
  }

  const newProduct = new productsModel({
    name,
    description,
    price,
    idCategory,
    stock: stock || 0,
    image: imageURL,
    imagePublicId: imagePublicId, 
    idBrand,
    idModel,
    discount: discount || 0,
  });
  await newProduct.save();
  res.status(201).json({ message: "Producto creado con éxito" });
};

productsController.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await productsModel.findById(id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    // Si hay nueva imagen, subirla y borrar la anterior
    if (req.file) {
      // Borrar imagen anterior si existe
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });

      updates.image = result.secure_url;
      updates.imagePublicId = result.public_id;
    }

    await productsModel.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: "Producto actualizado con éxito" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando el producto" });
  }
};
productsController.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsModel.findById(id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    // Eliminar imagen de Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await productsModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Producto eliminado con éxito" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando el producto" });
  }
};


export default productsController;
