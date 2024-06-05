import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import mechanicRoutes from "./routes/mechanicRoutes.js";
import customerRoutes from "./routes/CustomerRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"
import cors  from 'cors';

import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;


connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mechanics", mechanicRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/payments", paymentRoutes)

// API test purpose
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Motor Servicing at Home website!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
