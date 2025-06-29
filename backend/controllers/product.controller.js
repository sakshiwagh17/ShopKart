const { cloudinary } = require("../lib/cloudinary.js");
const redis = require("../lib/redis.js");
const Product = require("../models/product.js");

// Get all products
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.error("Error in getAllProduct:", error.message);
    res.status(500).json({ message: "Error fetching all products", error });
  }
};

// Get featured products with Redis cache
const getfeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");

    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    featuredProducts = await Product.find({ isfeatured: true }).lean();

    if (!featuredProducts.length) {
      return res.status(404).json({ message: "No featured products found" });
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.error("Error in getfeaturedProducts:", error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Create a product with Cloudinary upload
const createProducts = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url || "",
      category,
    });

    // Invalidate Redis cache
    await redis.del("featured_products");

    res.status(201).json(product);
  } catch (error) {
    console.error("Error in createProducts:", error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete product and its Cloudinary image
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Product image deleted from Cloudinary.");
      } catch (cloudError) {
        console.warn("Cloudinary delete error:", cloudError.message);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    await redis.del("featured_products");

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get random 3 recommended products
const getrecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 3 } },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    res.json({ products });
  } catch (error) {
    console.error("Error in getrecommendedProducts:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get products by category
const getProductByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json({ products });
  } catch (error) {
    console.error("Error in getProductByCategory:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

// Toggle feature status of a product
const toggleFeature = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    product.isfeatured = !product.isfeatured;
    const updatedProduct = await product.save();

    await updateProductCache();

    res.json({ updatedProduct });
  } catch (error) {
    console.error("Error in toggleFeature:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

// Helper to update featured product cache
const updateProductCache = async () => {
  try {
    const featured = await Product.find({ isfeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featured));
  } catch (error) {
    console.error("Error updating Redis featured_products cache:", error.message);
  }
};

module.exports = {
  getAllProduct,
  getfeaturedProducts,
  createProducts,
  deleteProduct,
  getrecommendedProducts,
  getProductByCategory,
  toggleFeature,
};
