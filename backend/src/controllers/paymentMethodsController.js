/**
 * TODO: ver lo de populate al obtener datos
 * TODO: Ver lo de cardDetail solo si es tarjeta de credito
 */

const paymentMethodsController = {};
import paymentMethodsModel from "../models/PaymentMethods.js";

// READ: Obtener todos los métodos de pago
paymentMethodsController.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await paymentMethodsModel.find(); 
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment methods", error: error.message });
  }
};

// READ: Obtener un método de pago específico
paymentMethodsController.getPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await paymentMethodsModel.findById(req.params.id)
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    res.json(paymentMethod);
  } catch (error) {
    res.status(400).json({ message: "Error fetching payment method", error: error.message });
  }
};

// CREATE: Crear un nuevo método de pago
paymentMethodsController.createPaymentMethods = async (req, res) => {
  const { paymentMethod, idClient, cardDetails } = req.body;

  try {
    // Validar datos de tarjeta solo si el método de pago es "Tarjeta de crédito"
    if (paymentMethod === "Tarjeta de crédito") {
      if (!cardDetails || !cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardHolder) {
        return res.status(400).json({ message: "Card details are required for credit card payment method." });
      }
    }

    const newPaymentMethod = new paymentMethodsModel({
      paymentMethod,
      idClient,
      cardDetails: cardDetails 
    });

    await newPaymentMethod.save();
    res.status(201).json({ message: "Payment method created"});
  } catch (error) {
    res.status(400).json({ message: "Error creating payment method", error: error.message });
  }
};

// UPDATE: Actualizar un método de pago
paymentMethodsController.updatePaymentMethods = async (req, res) => {
  const { paymentMethod, idClient, cardDetails } = req.body;

  try {
    const updates = { paymentMethod, idClient };

    // Actualizar datos de tarjeta si es "Tarjeta de crédito"
    if (paymentMethod === "Tarjeta de crédito") {
      if (!cardDetails || !cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardHolder) {
        return res.status(400).json({ message: "Card details are required for credit card payment method." });
      }
      updates.cardDetails = cardDetails;
    } else {
      updates.cardDetails = undefined; 
    }

    const updatedPaymentMethod = await paymentMethodsModel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedPaymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    res.json({ message: "Payment method updated" });
  } catch (error) {
    res.status(400).json({ message: "Error updating payment method", error: error.message });
  }
};

// DELETE: Eliminar un método de pago por ID
paymentMethodsController.deletePaymentMethods = async (req, res) => {
  try {
    const deletedPaymentMethod = await paymentMethodsModel.findByIdAndDelete(req.params.id);
    if (!deletedPaymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    res.json({ message: "Payment method deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting payment method", error: error.message });
  }
};

export default paymentMethodsController;
