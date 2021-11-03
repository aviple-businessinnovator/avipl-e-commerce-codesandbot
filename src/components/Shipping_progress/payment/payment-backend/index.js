const express = require("express");
const app = express();
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");

app.use(cors());

const razorpay = new Razorpay({
  key_id: "rzp_test_6KjaPF6vK633Tf",
  key_secret: "gt5Vx8LaUYdleduhZr6Kq3AJ",
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 5;
  const currency = "INR";

  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    //console.log(response);
    res.json({
      id: response.id,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});
app.listen(5000, () => {
  console.log("connected");
});
