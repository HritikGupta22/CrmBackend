// backend/controllers/customerController.js
import Customer from '../models/customer.js';

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const addCustomer = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const customer = new Customer({
      name,
      email,
      phone,
    });

    await customer.save();

    res.status(201).json({ message: 'Customer added', customer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
