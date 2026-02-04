import Order from "../model/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      user: req.user.userId,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "email role");
  res.json(orders);
};
