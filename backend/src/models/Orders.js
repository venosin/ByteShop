/**
    Campos:
        idClient
        Products
            idProduct
            quantity
            subtotal
        total
        status
 */

import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    idClient: {
      type: Schema.Types.ObjectId,
      ref: "Clients", // Referencia a la colección de clientes
      required: true,
    },
    products: [
      {
        idProduct: {
          type: Schema.Types.ObjectId,
          ref: "Products", // Referencia a la colección de productos
          required: true,
        },
        quantity: {
          type: Number, // Cantidad de este producto
          required: true,
        },
        subtotal: {
          type: Number, // Subtotal para este producto (cantidad * precio unitario)
          required: true,
        },
      },
    ],
    total: {
      type: Number, // Total del pedido (suma de los subtotales de los productos)
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"], // Estado del pedido
      default: "Pending",
    },
  },
  {
    timestamps: true, // Campos createdAt y updatedAt
  }
);

export default model("Orders", orderSchema);
