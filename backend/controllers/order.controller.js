import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";

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

export const getOrderById = async (
  req,
  res
) => {
  try {

    const order =
      await Order.findById(
        req.params.id
      ).populate("items.productId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch order",
    });
  }
};
export const createRazorpayOrder =
  async (req, res) => {
    try {

      const userId =
        req.user.userId;

      const cart =
        await Cart.findOne({
          userId,
        }).populate(
          "items.productId"
        );

      if (
        !cart ||
        cart.items.length === 0
      ) {
        return res.status(400).json({
          message:
            "Cart is empty",
        });
      }

      const amount =
        cart.items.reduce(
          (sum, item) =>
            sum +
            item.productId.price *
              item.quantity,
          0
        );

      const order =
        await razorpay.orders.create({
          amount:
            amount * 100,
          currency: "INR",
          receipt:
            "receipt_" +
            Date.now(),
        });

      res.json(order);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to create payment order",
      });
    }
  };

  export const verifyPayment = async (
  req,
  res
) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shippingAddress,
      
    } = req.body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
          "|" +
          razorpay_payment_id
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment verification failed",
      });
    }

    const userId =
      req.user.userId;

    const cart =
      await Cart.findOne({
        userId,
      }).populate(
        "items.productId"
      );

    const totalAmount =
      cart.items.reduce(
        (sum, item) =>
          sum +
          item.productId.price *
            item.quantity,
        0
      );

    const order =
      await Order.create({
        userId,

        items:
          cart.items.map(
            (item) => ({
              productId:
                item.productId._id,
              quantity:
                item.quantity,
            })
          ),

        totalAmount,
        shippingAddress,
      });

    cart.items = [];

    await cart.save();

    res.json({
      success: true,
      order,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Payment verification failed",
    });
  }
};