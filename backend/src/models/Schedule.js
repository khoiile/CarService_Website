import mongoose from "mongoose";

const { Schema, model } = mongoose;

const scheduleSchema = new Schema({
  Cart_ID: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  Service_ID: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  Scheduled_Date: {
    type: Date,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
});

const Schedule = model("Schedule", scheduleSchema);

export default Schedule;
