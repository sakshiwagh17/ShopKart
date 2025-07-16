const { stripe } = require("../lib/stripe");

const createcheckoutsession = async (req, res) => {
  try {
    const { products, couponcode } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty product array!" });
    }
    let lineItems = products.map((products) => {
      let amount = Math.round(products.price * 100); //sprite want to send in the percents
      totalAmount += amount * products.quantity;

      return {
        price_data: {
          currency: "INR",
          product_data: {
            name: products.name,
            image: [products.image],
          },
          unit_amount: amount,
        },
      };
    });

    let coupon = null;
    if (couponcode) {
      let coupon = await couponcode.findone({
        code: couponcode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountpercentage) / 100
        );
      }
    }
    let session = await stripe.checkout.session.create({
      payment_method_type: ["card"],
      line_Items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createSpriteCoupon(coupon.discountpercentage),
            },
          ]
        : [],
    });
  } catch (error) {}
};

async function createSpriteCoupon(discountpercentage) {
  const coupon = await stripe.coupon.create({
    precent_off: discountpercentage,
    duraction: "once",
  });
  return coupon._id;
}
module.exports = { createcheckoutsession };
