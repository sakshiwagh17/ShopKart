const { cloudinary } = require("../lib/cloudinary.js");
const redis = require("../lib/redis.js");
const Product = require("../models/product.js");

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.log("Error in product controller!", error.message);
    res.json({ message: "Error in getallproduct", error });
  }
};

const getfeaturedProducts = async (req, res) => {
  try {
    let featuredProduct = await redis.get("featured_products");
    if (featuredProduct) {
      return res.json(JSON.parse(featuredProduct));
    }
    //If not in redis then find in mongodb

    //lean() => it will return the plan javascript object rather then the mongodb document
    //It will good for performance
    featuredProduct = await Product.find({ isfeatured: true }).lean();
    if (!featuredProduct) {
      return res.status(404).json({ message: "No products found" });
    }

    //Store in redis for future quik access
    await redis.set("featured_products", JSON.stringify(featuredProduct));
    res.json(featuredProduct);
  } catch (error) {
    console.log("Error in feature products controller", error.message);
    res.json({ message: "Error in Server", error });
  }
};

const createProducts = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.upload(image, {
        folder: "products",
      });
    }
    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in create product controller", error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Producted deleted successfully from cloudinary!");
      } catch (error) {
        res.json({
          message: "Error in deleteting the product from cloudinary",
          error,
        });
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "product is deleted successfully" });
  } catch (error) {
    console.log("Error in deleting the product", error.message);
    res.status(500).json({ message: "Server Error!", error });
  }
};

const getrecommendedProducts = async (req, res) => {
  try {
    const product = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
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
    res.json({ product });
  } catch (error) {
    console.log("Error in recommended products", error.message);
    res.json({ message: "Server error", error });
  }
};

const getProductByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const product = await Product.find({ category });
    res.json({ product });
  } catch (error) {
    console.log("Error in getProductByCategory", error.message);
    res.json("Server error", error);
  }
};

const toggleFeature = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isfeatured = !product.isfeatured;
      const updateProduct = await product.save();
      await updateProductcache();
      res.json({ updateProduct });
    } else {
      res.json({ message: "Product is not found!" });
    }
  } catch (error) {
    console.log("Error in the toggle festure", error.message);
    res.json({ message: "Server Error!" });
  }
};
async function updateProductcache() {
  try {
    const featured = await Product.find({ isfeatured: true }).lean();
    await redis.set("featured_product", JSON.stringify(featured));
  } catch (error) {
    console.log("Error in the toggle festure", error);
  }
}
module.exports = {
  getAllProduct,
  getfeaturedProducts,
  createProducts,
  deleteProduct,
  getrecommendedProducts,
  getProductByCategory,
  toggleFeature,
};
