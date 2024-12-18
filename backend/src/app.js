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
import employeesRoutes from './routes/employees.js'
import paymentMethodsRoutes from './routes/paymentMethods.js'
import ordersRoutes from './routes/orders.js'
import purchasesRoutes from './routes/purchases.js'
import loginRoutes from './routes/login.js'
import registerRoutes from './routes/register.js'
import logoutRoutes from './routes/logout.js'
import {authRequire} from './middlewares/validateToken.js'
import cookieParser from 'cookie-parser'


const app = express();

// Settings 
// TODO: aqui van algunos ajustes

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Routes
//El sistema web puede acceder a las siguientes rutas:
app.use('/products', productsRoutes);
app.use('/clients', clientsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/brands', brandsRoutes)
app.use('/models', modelsRoutes)
app.use('/employees', employeesRoutes)
app.use('/paymentMethods', paymentMethodsRoutes)
app.use('/orders', ordersRoutes)
app.use('/purchases', purchasesRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/logout', logoutRoutes)
//PD: se agrega authRequire antes de la ruta para que el endpoint necesite un token


export default app;