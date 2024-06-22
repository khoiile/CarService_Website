import Customer from "../models/Customer.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { Schema, Types ,model } from "mongoose";
import bcrypt from "bcryptjs";


export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCustomerById = async (req, res) => {
  const { customerId } = req.params;
  console.log(customerId)
  try {
    const customer = await Customer.findOne({Customer_ID : new Types.ObjectId(customerId)});
    console.log(customer)
    console.log("null")
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer({
      Name: req.body.Name,
      Email: req.body.Email,
      Password: req.body.Password,
      Address: req.body.Address,
      PhoneNumber: req.body.PhoneNumber,
    });

    const existingCustomer = await Customer.findById({
      Email: newCustomer.Email,
    });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Customer with this email already exists" });
    } else {
      const savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  var { Name, Password, Address, PhoneNumber, OldPass } = req.body;

  try {
    const customer = await Customer.findOne({Customer_ID : new Types.ObjectId(customerId)});
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    var isMatch = null
    if(OldPass && Password){
      isMatch = await bcrypt.compare(OldPass, customer.Password);
      console.log(isMatch)
      if(!isMatch){
        return res.status(404).json({ message: "Wrong password!" });
      }
      const salt = await bcrypt.genSalt(10);
      Password = await bcrypt.hash(Password, salt);
  
      const updatedCustomer = await Customer.findOneAndUpdate(
        { Customer_ID : customerId},
        { Name, Password, Address, PhoneNumber },
        { new: true, runValidators: true }
      );
  
      if (!updatedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }else{
        return res.status(200).json({ message: "Change sucessfull!" });
      }
  
    }else{
      const updatedCustomer = await Customer.findOneAndUpdate(
        { Customer_ID : customerId},
        { Name, Address, PhoneNumber },
        { new: true, runValidators: true }
      );
  
      if (!updatedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }else{
        return res.status(200).json({ message: "Change sucessfull!" });
      }
    }
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const deleteCart = await Cart.deleteMany({Customer_ID : customerId})
    const deleteOrder = await Order.deleteMany({Customer_ID : new Types.ObjectId(customerId)})
    const deletedCustomer = await Customer.findOneAndDelete({Customer_ID : new Types.ObjectId(customerId)});

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCartForCustomerById = async (req, res) => {
  const { customerId } = req.params;
  try {
    
    const cart = await Cart.find({ Customer_ID: customerId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createCartForCustomer = async (req, res) => {
  const { customerID } = req.params;
  const { Created_Date } = req.body;
  try {
    const newCart = new Cart({
      Customer_ID: customerID,
      Created_Date,
    });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCartForCustomer = async (req, res) => {
  const { customerId, cartId } = req.params;
  const { Cart_ID, Created_Date } = req.body;
  try {
    let cart = await Cart.findOneAndUpdate(
      { Customer_ID: customerId, _id: cartId },
      { Cart_ID, Created_Date },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCartForCustomer = async (req, res) => {
  const { customerId, cartId } = req.params;
  try {
    const cart = await Cart.findOneAndDelete({
      Customer_ID: customerId,
      _id: cartId,
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getOrdersForCustomer = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const orders = await Order.find({ Customer_ID: customerId });
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createOrderForCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  const { TotalAmount, Status, OrderDate } = req.body;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const newOrder = new Order({
      Customer_ID: customerId,
      TotalAmount,
      Status,
      OrderDate,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateOrderForCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  const orderId = req.params.orderId;
  const { TotalAmount, Status, OrderDate } = req.body;

  try {
    const order = await Order.findOne({
      _id: orderId,
      Customer_ID: customerId,
    });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found for this customer" });
    }

    order.TotalAmount = TotalAmount;
    order.Status = Status;
    order.OrderDate = OrderDate;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteOrderForCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  const orderId = req.params.orderId;

  try {
    const order = await Order.findOne({
      _id: orderId,
      Customer_ID: customerId,
    });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found for this customer" });
    }
    await order.remove();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
