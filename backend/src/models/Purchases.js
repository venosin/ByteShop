import { Schema, model } from "mongoose";

const purchaseSchema = new Schema(
  {
    idOrder: {
      type: Schema.Types.ObjectId,
      ref: "Orders", 
      required: true,
    },
    idPaymentMethod: {
      type: Schema.Types.ObjectId, 
      ref: "paymentMethods", 
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Purchases", purchaseSchema);
