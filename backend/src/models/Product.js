import { Schema, model } from 'mongoose';

new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: String,
    imagen: String
},{
    timestamps: true
})