// backend/routes/orderRoutes.js
import express from 'express';
import { getOrders, addOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders', addOrder);
router.get('/orders', getOrders);

export default router;
