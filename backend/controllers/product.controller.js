import Product from "../models/Product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

export const createProduct = async (
  req,
  res
) => {
  try {

    const {
      name,
      description,
      category,
      price,
      image,
      stock,
    } = req.body;

    const product =
      await Product.create({
        name,
        description,
        category,
        price,
        image,
        stock,

        sellerId:
          req.user.userId,
      });

    res.status(201).json(
      product
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to create product",
    });

  }
};

export const getMyProducts =
async (req, res) => {

  try {

    const products =
      await Product.find({
        sellerId:
          req.user.userId,
      });

    res.json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch products",
    });

  }
};

export const deleteProduct =
async (req, res) => {

  try {

    const product =
      await Product.findOneAndDelete({
        _id:
          req.params.id,

        sellerId:
          req.user.userId,
      });

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    res.json({
      message:
        "Product deleted",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to delete product",
    });

  }
};

export const updateProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findOneAndUpdate(
          {
            _id: req.params.id,
            sellerId:
              req.user.userId,
          },
          req.body,
          {
            new: true,
          }
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      res.json(product);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to update product",
      });

    }
  };
export const getSellerProductById =
  async (req, res) => {

    try {

      const product =
        await Product.findOne({
          _id: req.params.id,
          sellerId:
            req.user.userId,
        });

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      res.json(product);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch product",
      });

    }
  };