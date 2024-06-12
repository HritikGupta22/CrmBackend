// backend/controllers/orderController.js
import Order from '../models/order.js';

export const addOrder = async (req, res) => {
  const { customer, product, amount } = req.body;

  try {
    const order = new Order({
      customer,
      product,
      amount,
    });

    await order.save();

    res.status(201).json({ message: 'Order added', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

