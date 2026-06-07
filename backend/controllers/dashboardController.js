import Product from "../models/Product.model.js";
import Order from "../models/Order.model.js";
import Detection from "../models/Detection.model.js";

export const getDashboard = async (
  req,
  res
) => {
  try {

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments({
        userId: req.user.userId,
      });

    const totalDetections =
      await Detection.countDocuments({
        userId: req.user.userId,
      });

    const recentOrders =
  await Order.find({
    userId: req.user.userId,
  })
  .populate("items.productId")
  .sort({ createdAt: -1 })
  .limit(5);

    const recentDetections =
      await Detection.find({
        userId: req.user.userId,
      })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalProducts,
      totalOrders,
      totalDetections,
      recentOrders,
      recentDetections,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to load dashboard",
    });
  }
};