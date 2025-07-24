const User = require("../models/User.js");
const Order = require("../models/order.js");

// to get the data for the analytics
const getAnalyticsData = async () => {
  const totalUser = await User.countDocuments(); //to count total user
  const totalProducts = await User.countDocuments(); //to count total products

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, //Get all the element together
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);
  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };
  return {
    users: totalUser,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
};

module.exports=getAnalyticsData;