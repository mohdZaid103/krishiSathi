import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {

    const authHeader =
      req.headers.authorization;

    const token =
      authHeader.split(" ")[1];

    console.log("TOKEN:");
    console.log(token);

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    console.log("DECODED:");
    console.log(decoded);

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Unauthorized",
    });

  }
};

export default auth;