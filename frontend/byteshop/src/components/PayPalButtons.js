import React, { useEffect } from "react";

const PayPalButton = () => {
  useEffect(() => {
    // Verificar si el botón ya está renderizado
    if (
      document.getElementById("paypal-button-container").children.length === 0
    ) {
      // Renderizar el botón de PayPal
      window.paypal
        .Buttons({
          style: {
            color: "blue", // Colores disponibles: "blue", "gold", "silver", "white", "black"
            shape: "pill", // Formas: "rect" (rectangular), "pill" (redondeado)
            label: "pay", // Opciones: "paypal", "checkout", "pay", "installment"
            tagline: false, // Muestra o oculta la línea de texto debajo del botón
          },
          createOrder: async () => {
            // Llamada al backend para crear un pedido
            const response = await fetch(
              "http://localhost:4000/api/payment/create-payment",
              {
                method: "POST",
              }
            );
            const orderData = await response.json();

            return orderData.id; // Retorna el ID del pedido
          },
          onApprove: async (data) => {
            // Llamada al backend para capturar el pago
            const response = await fetch(
              "http://localhost:4000/api/payment/capture-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify({ orderID: data.orderID }),
              }
            );

            const captureData = await response.json();
            alert("Pago realizado con éxito");
            console.log("Detalles del pago:", captureData);
          },
          onError: (err) => {
            console.error("Error en el pago:", err);
            alert("Hubo un error al procesar el pago");
          },
        })
        .render("#paypal-button-container"); // Renderiza el botón dentro de este contenedor
    }
  }, []);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
