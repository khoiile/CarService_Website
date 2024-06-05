import { Schema, Types ,model } from "mongoose";

const cartSchema = new Schema({

  Cart_ID:{
    type : Types.ObjectId,
    unique : true,
  },

  Service_id: {
    type : String,
    required: true
  },

  Service_name: {
    type : String,
    required: true
  },

  Service_price: {
    type : String,
    required: true
  },

  Service_price_value: {
    type : Number,
    required: true
  },

  Customer_ID: {
    type: String,
    ref: "Customer",
    required: true,
  },

});

const Cart = model("Cart", cartSchema);

export default Cart;
