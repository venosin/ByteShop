import { Schema, model } from 'mongoose';

const clientsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // La contraseña debe tener al menos 8 caracteres
  },
  telephone: {
    type: String,
    required: true,
    match: /^[0-9]{8}$/, // Validación para un teléfono de 8 dígitos
  },
  dui: {
    type: String,
    default: null, // Valor predeterminado null
    match: /^[0-9]{8}-[0-9]{1}$/, // Validación para el formato DUI (ejemplo: 12345678-9)
  },
},{
  timestamps: true,
  strict: false,
}
)

export default model('Clients', clientsSchema);
