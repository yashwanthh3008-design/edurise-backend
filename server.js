const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_SLshXwiXTLFqSJ",
  key_secret: "TEMP_SECRET", // Replace later with real secret
});

/* ================= CREATE ORDER ================= */

app.post("/create-order", async (req, res) => {
  try {
    const { plan } = req.body;

    let amount;
    let durationDays;

    if (plan === "monthly") {
      amount = 199 * 100;
      durationDays = 30;
    } else if (plan === "yearly") {
      amount = 1499 * 100;
      durationDays = 365;
    } else {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json({
      order,
      durationDays,
      plan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating order");
  }
});

/* ================= VERIFY PAYMENT (TEMP) ================= */

app.post("/verify-payment", async (req, res) => {
  // Temporary success response
  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("Edurise Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));