/*
    Campos:
        name
*/

import { Schema, model } from 'mongoose';

const modelsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true,
    strict: false,
})

export default model('Models', modelsSchema); 