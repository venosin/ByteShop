/*
    Campos:
        Nombre
*/

import { Schema, model } from 'mongoose';

const brandsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true,
    strict: false,
})

export default model('Brands', brandsSchema); 