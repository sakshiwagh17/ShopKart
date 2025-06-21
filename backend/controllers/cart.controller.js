const Product = require("../models/product");

// GET all products in cart with full details
const getCartProduct = async (req, res) => {
  try {
    const cartItems = req.user.cartItems; // Array of { product, quantity }

    const productIds = cartItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const detailedCart = products.map((product) => {
      const item = cartItems.find(
        (ci) => ci.product.toString() === product._id.toString()
      );
      return {
        ...product.toJSON(),
        quantity: item?.quantity || 1,
      };
    });

    res.json(detailedCart);
  } catch (error) {
    console.log("Error in getCartProduct:", error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ADD product to cart or increase quantity
const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addProductToCart:", error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

// REMOVE product from cart or clear cart
const removeProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      // Clear entire cart
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeProduct:", error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

// UPDATE quantity of a specific product
const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params; // From URL
    const { quantity } = req.body;
    const user = req.user;

    const item = user.cartItems.find(
      (ci) => ci.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (ci) => ci.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in updateQuantity:", error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getCartProduct,
  addProductToCart,
  removeProduct,
  updateQuantity,
};
