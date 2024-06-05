// paymentModel.js

import { Schema,Types, model } from "mongoose";

const paymentSchema = new Schema({
  Payment_ID : {
    type : Types.ObjectId,
    default :() => new Types.ObjectId(),
    unique : true,
  },
  Order_ID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  PaymentDate: {
    type: Date,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  PaymentMethod: {
    type: String,
    required: true,
  },
});

const Payment = model("Payment", paymentSchema);

export default Payment;
