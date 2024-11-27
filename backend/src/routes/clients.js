import express from 'express';
const router = express.Router();

import clientsController from '../controllers/clientsController.js';

router.route('/')
    .get(clientsController.getclients)
    .post(clientsController.createclients)

router.route('/:id')
.delete(clientsController.deleteclients)



export default router;