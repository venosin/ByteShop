import { Schema, model } from 'mongoose';

const paymentMethodsSchema = new Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    idClient: {
        type: Schema.Types.ObjectId,
        ref: 'Client', // Asegúrate de que este campo se refiera a tu colección de clientes
        required: true
    },
    cardDetails: {
        cardNumber: {
            type: String,  // Almacena de manera encriptada o tokenizada
            required: function() { return this.paymentMethod === 'Tarjeta de crédito'; }
        },
        expiryDate: {
            type: String,  // Formato MM/AA
            required: function() { return this.paymentMethod === 'Tarjeta de crédito'; }
        },
        cvv: {
            type: String,  // Almacenar encriptado o no almacenar en caso de ser necesario
            required: function() { return this.paymentMethod === 'Tarjeta de crédito'; }
        },
        cardHolder: {
            type: String,
            required: function() { return this.paymentMethod === 'Tarjeta de crédito'; }
        }
    }
}, {
    timestamps: true,  // Para llevar un control de cuándo fue creado/actualizado
    strict: false  // Para permitir campos adicionales si es necesario
});

export default model('paymentMethods', paymentMethodsSchema);
