import { Schema, model } from 'mongoose';

const employeesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    telephone: {
      type: String,
      required: true,
      match: [/^\d{8}$/, 'Invalid telephone format. Must be 8 digits.'],
    },
    dui: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{8}-\d$/, 'Invalid DUI format. Must follow XXXXXXXX-X.'],
    },
    address: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    hireDate: {
      type: Date,
      required: true,
    },
    isssNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    strict: false,     
  }
);

export default model('Employees', employeesSchema);
