import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import Admin from "../models/Admin.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token");
  console.log(token)
  if (!token) {
    console.log("no token")
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    if (req.user.isAdmin) {
      req.user = await Admin.findById(req.user.id);
    } else {
      req.user = await Customer.findById(req.user.id);
    }

    next();
  } catch (err) {
    console.error("Token is not valid", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};
