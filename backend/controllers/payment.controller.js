const { stripe } = require("../lib/stripe.js");
const  Coupon  = require("../models/coupon.js");
const  Order  = require("../models/order.js");
const createcheckoutsession = async (req, res) => {
  try {
    const { products, couponcode } = req.body;

    //Checking products exist for checkout or not
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty product array!" });
    }

    //PRODUCT FOR THE STRIPE PAYMENT
    let totalAmount = 0;

    let lineItems = products.map((product) => {
      let amount = Math.round(product.price * 100); // Stripe needs smallest currency unit
      totalAmount += amount * product.quantity; //Increase the amount as per the quantity

      return {
        price_data: {
          currency: "INR",
          product_data: {
            name: product.name,
            images: [product.image], // Correct key: images (plural)
          },
          unit_amount: amount,
        },
        quantity: product.quantity||1,
      };
    });

    let coupon = null;
    if (couponcode) {
      coupon = await Coupon.findOne({
        code: couponcode,
        userId: req.user._id,
        isActive: true,
      });

      //if the coupon exits than remove the discount form the total amount
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    //Creating Stripe Checkout Session

    let session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`, //redirect if success
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`, //redirect if cancel
      discounts: coupon
        ? [
            {
              //If a coupon exists ,create a sprite coupon
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

    //If user spent more than 2000 than automatically generate a coupon
    if (totalAmount >= 2000 * 100) {
      // ₹2000 in paise
      await createNewCoupon(req.user._id);
    }

    //Here the sessionId will vist the frontend page
    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 }); //Return the total bill in ₹, not paisa
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
  await Coupon.findOneAndDelete({userId})
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(), //It will generate a random 6 letter code
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    userId: userId,
    isActive: true,
  });

  await newCoupon.save();
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
