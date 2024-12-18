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
            type: String,  
        },
        expiryDate: {
            type: String,
        },
        cvv: {
            type: String,  
        },
        cardHolder: {
            type: String,
        }
    },
    idClient: {
        type: Schema.Types.ObjectId,
        ref: 'Clients', 
        required: true
    },
   
}, {
    timestamps: true, 
    strict: false  
});

export default model('paymentMethods', paymentMethodsSchema);
