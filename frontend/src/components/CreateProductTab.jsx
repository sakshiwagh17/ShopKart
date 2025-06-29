import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const CreateProductTab = () => {
  const { createProduct } = useProductStore();
  const categories = [
    "jeans",
    "bags",
    "glasses",
    "jackets",
    "shoes",
    "suits",
    "tshirts",
  ];

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.log("Error in creating products!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="shadow-xl rounded-2xl p-8 bg-white max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-center text-3xl font-bold text-indigo-600 mb-6">
        Create New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            value={newProduct.name}
            required
            type="text"
            placeholder="Enter product name"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Write a short description..."
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            value={newProduct.description}
            rows="3"
            className="w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            placeholder="Enter price"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            value={newProduct.price}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition">
            <input
              type="file"
              id="image"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="flex items-center justify-center space-x-2 text-indigo-600">
              <Upload className="h-5 w-5" />
              <span className="font-medium">
                {newProduct.image ? "Change Image" : "Upload Image"}
              </span>
            </div>
            {newProduct.image && (
              <p className="mt-2 text-sm text-gray-500">Image uploaded successfully</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create Product</span>
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductTab;
