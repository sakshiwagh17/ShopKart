const express = require("express");
const dotenv = require("dotenv");
const cookieParser=require('cookie-parser')

const authRoute = require("./Routes/authRoute.js");
const productsRoute=require("./Routes/productsRoute.js")
const cartRoute=require("./Routes/cartRoute.js")
const paymentRoute=require("./Routes/paymentRoute.js")
const connectDB = require("./lib/db.js");

const app = express();
dotenv.config();
app.use(express.json()); //it pares the request body in json
app.use(cookieParser())
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is working!!");
});

app.use("/api/auth", authRoute);
app.use("/api/products",productsRoute);
app.use("/api/cart",cartRoute);
app.use("/api/payment",paymentRoute);
app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`);
  connectDB();
});
