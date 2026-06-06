import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) =>
        sum +
        item.productId.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    // Empty cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to place order",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({
      userId,
    })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};