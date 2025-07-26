const User = require("../models/User.js");
const Order = require("../models/order.js");
const Product = require("../models/product.js"); 

// to get the data for the analytics
const getAnalyticsData = async () => {
  const totalUser = await User.countDocuments();       // Total users
  const totalProducts = await Product.countDocuments(); //  Total products

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, // Group all orders together
        totalSales: { $sum: 1 }, // Count of orders
        totalRevenue: { $sum: "$totalAmount" }, // Sum of revenue
      
      },
    },
  ]);

  // Fallback if no sales data
  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };
console.log(totalRevenue);
console.log(totalSales)
  return {
    users: totalUser,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
};

module.exports = getAnalyticsData;
