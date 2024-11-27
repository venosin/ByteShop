import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.js';
import clientsRoutes from './routes/clients.js'
import categoriesRoutes from './routes/categories.js'


const app = express();

// Settings 

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/products', productsRoutes);
app.use('/clients', clientsRoutes);
app.use('/categories', categoriesRoutes);


export default app;