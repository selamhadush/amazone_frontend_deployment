import { onRequest } from "firebase-functions/v2/https";
// const logger = require("firebase-functions/logger");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import stripe from "stripe"; //(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success!",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  try {
    if (total > 0) {
      const paymentIntent = await stripe(
        process.env.STRIPE_KEY
      ).paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      // console.log("Payment received.", total);
      res.status(201).json({
        client_secret: paymentIntent.client_secret,
      });
    } else {
      res
        .status(403)
        .json({ message: "Invalid payment. total must be greater than 0." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating payment intent", error: error.message });
  }
});
export const api = onRequest(app);
