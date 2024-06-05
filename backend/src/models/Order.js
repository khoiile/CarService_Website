import { Schema, Types,model } from "mongoose";

const cartSchema = new Schema({

  Cart_ID:{
    type : Types.ObjectId,
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

const orderSchema = new Schema({
  Order_ID : {
    type : Types.ObjectId,
    default :() => new Types.ObjectId(),
    unique : true,
  },

  Customer_ID: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  TotalAmount: {
    type: Number,
    required: true,
  },
  DateOrder: {
    type: Date,
    required: true,
  },
  Schedule: {
    type: Date,
    required: true,
  },

  Name : {
    type : String,
    required: true,
  },
  
  Email : {
    type : String,
    required: true
  },

  PhoneNumber : {
    type : String,
    required: true
  },

  Address : {
    type : String,
    required: true
  },

  Carts :  [cartSchema]
});

const Order = model("Order", orderSchema);

export default Order;
