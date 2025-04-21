import Razorpay from "razorpay";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  // Ensure amount is a valid number
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount provided" });
  }

  try {
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise (1 INR = 100 paise)
      currency: "INR",
      receipt: `donation_${Date.now()}`,
    });

    // Send the order details as a response
    return res.json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err); // Log the error for debugging
    return res
      .status(500)
      .json({ error: "Failed to create Razorpay order", details: err.message });
  }
};
