/*
    Campos:
       paymentMethod 
       cardDetails
            cardNumber
            expiryDate
            cvv
            cardHolder
       idClient

*/

import { Schema, model } from 'mongoose';

const paymentMethodsSchema = new Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    cardDetails: {
        cardNumber: {
            type: String,  // Almacenar de manera encriptada 
        },
        expiryDate: {
            type: String,  // Formato MM/AA
        },
        cvv: {
            type: String,  // Almacenar encriptado
        },
        cardHolder: {
            type: String,
        }
    },
    idClient: {
        type: Schema.Types.ObjectId,
        ref: 'Client', // Asegúrate de que este campo se refiera a tu colección de clientes
        required: true
    },
   
}, {
    timestamps: true,  // Para llevar un control de cuándo fue creado/actualizado
    strict: false  // Para permitir campos adicionales si es necesario
});

export default model('paymentMethods', paymentMethodsSchema);
