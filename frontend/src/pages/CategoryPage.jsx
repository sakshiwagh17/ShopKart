import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductItem from "../components/ProductItem";

const CategoryPage = () => {
  const { getProductByCategory, products } = useProductStore();
  const { category } = useParams();
  useEffect(() => {
    getProductByCategory(category);
  }, [getProductByCategory, category]);
  console.log("Productss", products);
  return (
    <div className="min-h-screen">
      <div>
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-indigo-500 m-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-500 text-center col-span-full">
              No Products Found
            </h2>
          )}
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
