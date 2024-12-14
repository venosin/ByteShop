const paymentMethodsController = {};
import paymentMethodsModel from "./models/paymentMethods.js";

// READ: Select a todos los métodos de pago
paymentMethodsController.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await paymentMethodsModel.find().populate('idClient'); // Populate idClient with relevant client data
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment methods", error: error.message });
  }
};

// READ: Select a un método de pago específico
paymentMethodsController.getPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await paymentMethodsModel.findById(req.params.id).populate('idClient', 'name email'); // Populate idClient with relevant client data
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    res.json(paymentMethod);
  } catch (error) {
    res.status(400).json({ message: "Error fetching payment method", error: error.message });
  }
};

// CREATE: Crea un nuevo método de pago
paymentMethodsController.createPaymentMethod = async (req, res) => {
  const { paymentMethod, idClient } = req.body;
  try {
    const newPaymentMethod = new paymentMethodsModel({ 
      paymentMethod,
      idClient
    });
    await newPaymentMethod.save();
    res.json({ message: "Payment method created", data: newPaymentMethod });
  } catch (error) {
    res.status(400).json({ message: "Error creating payment method", error: error.message });
  }
};

// UPDATE: Actualiza un método de pago
paymentMethodsController.updatePaymentMethod = async (req, res) => {
  const { paymentMethod, idClient } = req.body;
  try {
    const updatedPaymentMethod = await paymentMethodsModel.findByIdAndUpdate(
      req.params.id,
      { paymentMethod, idClient },
      { new: true }
    );
    if (!updatedPaymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    res.json({ message: "Payment method updated", data: updatedPaymentMethod });
  } catch (error) {
    res.status(400).json({ message: "Error updating payment method", error: error.message });
  }
};

// DELETE: Borra un método de pago en base al id
paymentMethodsController.deletePaymentMethod = async (req, res) => {
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
