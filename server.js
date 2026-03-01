const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_YOUR_NEW_KEY_ID",
  key_secret: "YOUR_NEW_SECRET",
});

app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 49900,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Order creation failed",
    });
  }
});

app.get("/", (req, res) => {
  res.send("EduRise Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));