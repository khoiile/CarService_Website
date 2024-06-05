import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import Payment from "../models/Payment.js";
import Cart from "../models/Cart.js";
import { Schema, Types,model } from "mongoose";

export const createOrder = async (req, res) => {
  try {
    const customer = await Customer.findById(req.body.Customer_ID);
    if (customer) {
      return res.status(404).json({ "message": "Customer ID not found" });
    }

    const cart = await Cart.find({Customer_ID : req.body.Customer_ID})
    if(cart.length == 0){
      return res.status(404).json({ "message": "Your cart is empty!" });
    }

    const cus = await Customer.findOne({Customer_ID : req.body.Customer_ID})

    console.log(cus)

    const newOrder = new Order({
      Customer_ID: req.body.Customer_ID,
      TotalAmount: req.body.TotalAmount,
      DateOrder : Date.now(),
      Schedule : req.body.schedule,
      Name : cus.Name ,
      Email : cus.Email ,
      PhoneNumber : cus.PhoneNumber,
      Address : cus.Address,
      Carts : cart
    });

    const savedOrder = await newOrder.save(); 
    await Cart.deleteMany({Customer_ID : req.body.Customer_ID})
    res.status(201).json({"order":savedOrder, "message" : "Order successfull!"});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findOne({Order_ID : new Types.ObjectId(orderId)});
    if (!order) {
      return res.status(404).json({ "message": "Order not found" });
    }
    res.json({
      "order" : order,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { TotalAmount, Status } = req.body;
  try {
    let order = await Order.findByIdAndUpdate(
      orderId,
      { TotalAmount, Status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    let order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.remove();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPaymentsForOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const payments = await Payment.find({ Order_ID: orderId });
    res.json(payments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addPaymentToOrder = async (req, res) => {
  const { orderId } = req.params;
  const { PaymentDate, Amount, PaymentMethod } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const newPayment = new Payment({
      Order_ID: orderId,
      PaymentDate,
      Amount,
      PaymentMethod,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
