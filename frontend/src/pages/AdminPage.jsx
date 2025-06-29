import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import CreateProductTab from "../components/CreateProductTab";
import ProductList from "../components/ProductList";
import AnalyticsTab from "../components/AnalyticsTab";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "product", label: "Product", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];
const AdminPage = () => {
  const [active, setActive] = useState();
  const {fetchAllProduct}=useProductStore();
  useEffect(() => {
    fetchAllProduct();
  }, [fetchAllProduct])
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-indigo-500 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>
        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              onClick={() => setActive(tab.id)}
              className={`flex rounded-md bg-indigo-500 text-white px-4 py-2 mx-3 transition-colors duration-200 ${
                active === tab.id
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-500-700 text-white hover:bg-indigo-400"
              }`}
            >
              {<tab.icon className="mr-2 h-5 w-5" />}
              {tab.label}
            </button>
          ))}
        </div>
        {active==='create'&&<CreateProductTab />}
        {active==='product' && <ProductList />}
        {active==='analytics' && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;
