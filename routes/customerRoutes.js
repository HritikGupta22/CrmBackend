// backend/routes/customerRoutes.js
import express from 'express';
import { getCustomers, addCustomer }from '../controllers/customerController.js';

const router = express.Router();

router.get('/customers', getCustomers);
router.post('/customers', addCustomer);

export default router;
