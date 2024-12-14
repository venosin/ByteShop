import express from "express";
const router = express.Router();

import paymentMethodsController from "../controllers/paymentMethodsController.js";

router.route("/")
  .get(paymentMethodsController.getPaymentMethods)
  .post(paymentMethodsController.createPaymentMethods);

router.route("/:id")
  .get(paymentMethodsController.getPaymentMethod)
  .put(paymentMethodsController.updatePaymentMethods)
  .delete(paymentMethodsController.deletePaymentMethods);

export default router;
