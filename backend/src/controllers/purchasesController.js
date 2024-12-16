import Purchase from "../models/Purchases.js";
import Order from "../models/Orders.js";
import PaymentMethod from "../models/PaymentMethods.js"; // Importa el modelo de PaymentMethods

const purchasesController = {};

// READ: Obtener todas las compras
purchasesController.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("idOrder") // Poblar idOrder para obtener detalles del pedido
      .populate("idPaymentMethod"); // Poblar idPaymentMethod para obtener detalles del método de pago
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Error fetching purchases", error: error.message });
  }
};

// READ: Obtener una compra específica
purchasesController.getPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate("idOrder")  // Poblar idOrder para obtener detalles
      .populate("idPaymentMethod");  // Poblar idPaymentMethod para obtener detalles

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.json(purchase);
  } catch (error) {
    res.status(400).json({ message: "Error fetching purchase", error: error.message });
  }
};

// CREATE: Crear una nueva compra
purchasesController.createPurchases = async (req, res) => {
  const { idOrder, idPaymentMethod, address } = req.body;

  try {
    // Validar que la orden existe
    const order = await Order.findById(idOrder);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Validar que el método de pago existe
    const paymentMethodDoc = await PaymentMethod.findById(idPaymentMethod);
    if (!paymentMethodDoc) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    // Crear la nueva compra
    const newPurchase = new Purchase({
      idOrder,
      idPaymentMethod,  // Usar idPaymentMethod en lugar de paymentMethod
      address,
    });

    // Guardar la compra
    await newPurchase.save();

    // Responder con el éxito de la operación
    res.status(201).json({ message: "Purchase created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating purchase", error: error.message });
  }
};

// UPDATE: Actualizar una compra
purchasesController.updatePurchases = async (req, res) => {
  const { idPaymentMethod, address } = req.body;

  try {
    // Validar que el método de pago existe
    const paymentMethodDoc = await PaymentMethod.findById(idPaymentMethod);
    if (!paymentMethodDoc) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    // Actualizar la compra
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      { idPaymentMethod, address }, // Usar idPaymentMethod en lugar de paymentMethod
      { new: true } // Devuelve el objeto actualizado
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json({ message: "Purchase updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating purchase", error: error.message });
  }
};

// DELETE: Eliminar una compra
purchasesController.deletePurchases = async (req, res) => {
  try {
    const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting purchase", error: error.message });
  }
};

export default purchasesController;
