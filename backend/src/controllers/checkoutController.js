export const checkout = (req, res) => {
  const { customerInfo } = req.body;
  res.status(200).json({ message: "Checkout successful", customerInfo });
};
