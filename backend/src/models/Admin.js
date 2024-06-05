import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  Admin_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Admin = model("Admin", adminSchema);

export default Admin;
