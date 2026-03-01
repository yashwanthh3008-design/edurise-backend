const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_SLshXwiXTLFqSJ",
  key_secret: "TEMP_SECRET", // will replace later
});

app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 199 * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating order");
  }
});

// TEMP verification (no signature check yet)
app.post("/verify-payment", async (req, res) => {
  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("Edurise Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));