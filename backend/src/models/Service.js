import { Schema, model } from "mongoose";

const serviceSchema = new Schema({

  Service_ID : {
    type : String,
    require : true
  },

  Service_name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },

  price_value: {
    type: Number,
    required: true,
  },
});

const Service = model("Services", serviceSchema);
export default Service;
