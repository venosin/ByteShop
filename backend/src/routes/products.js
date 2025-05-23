import express from "express";
const router = express.Router();
import productsController from "../controllers/productsController.js";
import multer from "multer";

// Configuración de multer para archivos temporales
const upload = multer({ dest: "public/" });

router
  .route("/")
  .get(productsController.getProducts) 
  .post(upload.single("image"), productsController.createProducts); 

router
  .route("/:id")
  .get(productsController.getProduct) 
  .put(upload.single("image"), productsController.updateProduct) 
  .delete(productsController.deleteProduct); 

export default router;
