import User from "../models/User.model.js";
import Order from "../models/Order.model.js";
import Detection from "../models/Detection.model.js";

export const getProfile = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.user.userId
    ).select("-password");

    const totalOrders =
      await Order.countDocuments({
        userId: req.user.userId,
      });

    const totalDetections =
      await Detection.countDocuments({
        userId: req.user.userId,
      });

    res.json({
      user,
      totalOrders,
      totalDetections,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to load profile",
    });
  }
};