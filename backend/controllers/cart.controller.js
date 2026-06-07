import Cart from "../models/Cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        quantity: 1,
      });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add item",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.status(200).json(
      cart || {
        userId,
        items: [],
      }
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch cart",
    });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to remove item",
    });
  }
};
export const decreaseQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i) =>
          i.productId.toString() !== productId
      );
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to decrease quantity",
    });
  }
};
export const getCartCount = async (
  req,
  res
) => {
  try {

    const cart = await Cart.findOne({
      userId: req.user.userId,
    });

    if (!cart) {
      return res.json({
        count: 0,
      });
    }

    const count = cart.items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

    res.json({
      count,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch count",
    });
  }
};