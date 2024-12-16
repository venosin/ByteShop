import { Schema, model } from "mongoose";

const purchaseSchema = new Schema(
  {
    idOrder: {
      type: Schema.Types.ObjectId,
      ref: "Orders", // Relación con un pedido
      required: true,
    },
    idPaymentMethod: {
      type: Schema.Types.ObjectId, // Referencia a la colección PaymentMethods
      ref: "paymentMethods", // Referencia a la colección de métodos de pago
      required: true,
    },
    address: {
      type: String, // Dirección de envío
      required: true,
    },
  },
  {
    timestamps: true, // Campos createdAt y updatedAt
    strict: false,
  }
);

export default model("Purchases", purchaseSchema);
