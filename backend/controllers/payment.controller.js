const { stripe } = require("../lib/stripe.js");
const Coupon = require("../models/coupon.js");
const Order = require("../models/order.js");

const createcheckoutsession = async (req, res) => {
  try {
    const { products, couponcode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty product array!" });
    }

    let originalTotalAmount = 0;
    let totalAmount = 0;

    let lineItems = products.map((product) => {
      let amount = Math.round(product.price * 100);
      originalTotalAmount += amount * product.quantity;
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "INR",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponcode) {
      coupon = await Coupon.findOne({
        code: couponcode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponcode: couponcode || "",
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
      },
    });

    // Check original (pre-discount) total
    if (originalTotalAmount >= 2000 * 100) {
      await createNewCoupon(req.user._id);
    }

    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
};

//Sprite coupon
async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
}

//new coupon gift for user after a big  purchase
async function createNewCoupon(userId) {
  const newCouponData = {
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    isActive: true,
    userId,
  };

  const newCoupon = await Coupon.findOneAndUpdate({ userId }, newCouponData, {
    upsert: true,
    new: true,
  });

  console.log("New coupon created or updated:", newCoupon.code);
  return newCoupon;
}

const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId); //Gives the details of the session
    if (session.payment_status === "paid") {
      //checking if the payment is done or not

      //Here the coupon deactivation is done if the coupon is appied
      if (session.metadata.couponcode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponcode,
            userId: session.metadata.userId,
          },
          {
            isActive: false,
          }
        );
      }
      //create New Order Product
      const products = JSON.parse(session.metadata.products);
      const newOrder = await Order.create({
        user: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100, //convert form cents to rupee
        stripeSessionId: sessionId,
      });
      await newOrder.save();
      res.status(200).json({
        success: true,
        message:
          "Payment successfull,order created and coupon deactived if use",
        orderId: newOrder._id,
      });
    }
  } catch (error) {
    console.error("Error in checkout successfull session:", error);
    res
      .status(500)
      .json({ error: "Failed to create checkout successfull session." });
  }
};

module.exports = { createcheckoutsession, checkoutSuccess };
