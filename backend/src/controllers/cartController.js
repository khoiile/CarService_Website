import Cart from "../models/Cart.js";
import Schedule from "../models/Schedule.js";
import Service from "../models/Service.js";
import { Schema, Types ,model } from "mongoose";

export const getAllCartsByid = async (req, res) => {
  const { iduser } = req.query;
  try {
    const carts = await Cart.find({Customer_ID : iduser})
    res.json(carts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCartById = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCart = async (req, res) => {
  const { cartId } = req.params;
  const updates = req.body;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(cartId, updates, {
      new: true,
    });
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(updatedCart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addtoCart = async (req, res) => {
  try {
    const { servID } = req.body;
    const existingService = await Cart.findOne({
      Service_id :servID,
      Customer_ID : req.body.iduser
    });
    
    if (existingService) {
      return res
        .status(400)
        .json({ "message": "Cart with this ID already exists" });
    }

    const countCart = await Cart.find({Customer_ID : req.body.iduser})

    console.log(countCart)
    if(countCart.length === 5){
      return res
        .status(400)
        .json({ "message": "Cart get to max limit (5 services)" });
    }

    const service = await Service.findOne({Service_ID : req.body.servID})
    
    console.log(service)
    if(!service){
      return res
      .status(400)
      .json({ "message": "Service not exist!" });
    }

    console.log(service.Service_name)
    console.log(req.body.iduser)
    const cartId = new Types.ObjectId();

    const newCart = new Cart({
      Cart_ID : cartId,
      Service_id : req.body.servID,
      Service_name : service.Service_name,
      Service_price : service.Price,
      Service_price_value : service.price_value,
      Customer_ID: req.body.iduser
    });

    await newCart.save();
    res.status(200).json({"message": "done"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ "message": "Server Error" });
  }
};

export const deleteCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const deletedCart = await Cart.findOneAndDelete({ Cart_ID: new Types.ObjectId(cartId)});
    if (!deletedCart) {
      return res.status(404).json({ "message": "Cart not found" });
    }
    res.json({ "message": "Cart deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ "message": "Server Error" });
  }
};

export const getSchedulesByCartId = async (req, res) => {
  const { cartId } = req.params;

  try {
    const schedules = await Schedule.find({ Cart_ID: cartId });
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
