import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

export const createPayment = async (req, res) => {
  try {
    const order = await Order.findOne({Order_ID : req.body.Order_ID});
    if (!order) {
      return res.status(404).json({ "message": "Order ID not found" });
    }

    const newPayment = new Payment({
      Order_ID: req.body.Order_ID,
      PaymentDate: Date.now(),
      Amount: req.body.Amount,
      PaymentMethod: req.body.PaymentMethod,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPaymentByOrderID = async (req, res) => {
  const { orderID } = req.params;

  try {
    const payment = await Payment.findOne({ Order_ID: orderID });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updatePayment = async (req, res) => {
  const { paymentId } = req.params;
  const { PaymentDate, Amount, PaymentMethod } = req.body;
  try {
    let payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        PaymentDate,
        Amount,
        PaymentMethod,
      },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deletePayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findByIdAndDelete(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
