import React from 'react';
import { useProductStore } from '../stores/useProductStore';
import { motion } from 'framer-motion';
import { Star, StarOff, Trash } from 'lucide-react';

const ProductList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div
      className="p-6 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="rounded-xl shadow-xl bg-white overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-indigo-600">
            <tr>
              {['Products', 'Category', 'Price', 'Featured', 'Actions'].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products?.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded-full object-cover shadow-sm"
                    />
                    <span className="ml-4 font-medium text-gray-800">{product.name}</span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">${product.price}</td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFeaturedProduct(product._id)}
                      className="hover:text-yellow-500 transition"
                      title="Toggle Featured"
                    >
                      {product.featured ? (
                        <Star className="text-yellow-400" />
                      ) : (
                        <StarOff className="text-gray-400" />
                      )}
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="hover:text-red-600 transition"
                      title="Delete Product"
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductList;
