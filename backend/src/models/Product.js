import { Schema, model } from 'mongoose';

const productsSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,  // Referencia a la colección Categorias
      ref: 'Categories',
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: String
  });
export default model('Products', productsSchema);

