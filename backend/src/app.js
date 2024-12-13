/*
 * Este archivo configura la aplicación principal de Express.
 * Define los ajustes básicos, los middlewares y las rutas que utilizará la aplicación.
 *
 * TODO: Agregar ajustes adicionales
 */

import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.js';
import clientsRoutes from './routes/clients.js'
import categoriesRoutes from './routes/categories.js'
import brandsRoutes from './routes/brands.js'
import modelsRoutes from './routes/models.js'

const app = express();

// Settings 
// TODO: aqui van algunos ajustes

// Middlewares
/*
Un middleware es una función que se ejecuta entre la solicitud (request) del cliente y la respuesta (response) del servidor. 
Puede realizar tareas como validar datos, registrar actividad o transformar la solicitud antes de pasarla a la siguiente función.
Por ejemplo,
Piensa en un guardia de seguridad en la entrada de un edificio. Antes de que alguien entre, el guardia revisa su identificación
(validación) o le da una tarjeta de acceso (modificación). Este proceso sucede antes de que la persona pueda continuar hacia su destino.
*/
app.use(cors());
/*
PD: Cors: es un mecanismo que permite que un servidor acepte solicitudes desde dominios diferentes al suyo. 
Por defecto, los navegadores bloquean estas solicitudes para proteger datos sensibles.
Esto permite que aplicaciones externas puedan hacer solicitudes al servidor. Por ejemplo, 
si tu servidor está en http://api.ejemplo.com, aplicaciones desde http://frontend-app.com pueden enviar solicitudes sin ser bloqueadas.
 */
app.use(express.json());

// Routes
//El sistema web puede acceder a las siguientes rutas:
app.use('/products', productsRoutes);
app.use('/clients', clientsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/brands', brandsRoutes)
app.use('./models', modelsRoutes)

export default app;