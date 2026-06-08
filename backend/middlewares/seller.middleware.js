const sellerOnly = (
  req,
  res,
  next
) => {

  console.log("USER DATA:");
  console.log(req.user);

  if (
    req.user.role !== "seller"
  ) {
    return res.status(403).json({
      message:
        "Seller access only",
    });
  }

  next();
};

export default sellerOnly;