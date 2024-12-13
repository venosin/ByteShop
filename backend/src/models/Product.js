import { Schema, model } from 'mongoose';

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  idCategory: {
    type: Schema.Types.ObjectId, // Referencia a la colección Categorias
    ref: 'Categories',
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  image: {
    type: String,
    required: false,
  },
  idBrand: {
    type: Schema.Types.ObjectId, // Referencia a la colección Marcas
    ref: 'Brands',
    required: true,
  },
  idModel: {
    type: Schema.Types.ObjectId, // Referencia a la colección Modelos
    ref: 'Models',
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100, // Porcentaje de descuento
  },
},{
  timestamps: true,
  strict: false,
})


export default model('Products', productsSchema);

