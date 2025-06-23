import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/userStore";
import { PlusCircle, Upload } from "lucide-react";
const CreateProductTab = () => {
  const { loading } = useUserStore();
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
    console.log(newProduct);
  };
  const handleImageChange = async () => {};
  return (
    <motion.div
      className="shadow-lg rounded-lg p-8 mb-8 items-center max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-center text-indigo-500 text-2xl font-bold">
        Create New product
      </h1>
      <form onClick={handleSubmit} action="">
        <div>
          <label htmlFor="">Product Name</label>
          <input
            value={newProduct.name}
            required
            type="text"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full  border border-gray-600 rounded-xl shadow-sm py-2 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2"
          />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <textarea
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            value={newProduct.description}
            on
            rows="3"
            className="mt-1 block w-full  border border-gray-600 rounded-xl shadow-sm py-2 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="">Price</label>
          <input
            type="number"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            value={newProduct.price}
            className="mt-1 block w-full  border border-gray-600 rounded-xl shadow-sm py-2 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2"
          />
        </div>
        <div>
          <label htmlFor="">Category</label>
          <select
            name=""
            id=""
            className="mt-1 block w-full  border border-gray-600 rounded-xl shadow-sm py-2 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2"
          >
            <option>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="mt-1 block w-full  border border-gray-600 rounded-xl shadow-sm py-2 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-gray-400">Image uploaded </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 gap-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={loading}
        >
          <PlusCircle />
          Create Product
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductTab;
