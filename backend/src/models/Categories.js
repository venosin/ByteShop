import { Schema, model } from 'mongoose';

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    image: String
},{
    timestamps: true
})

export default model('Categories', categoriesSchema);