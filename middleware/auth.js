import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.status(401).json({ error: "Access Denied" });

  const token = authHeader.split(" ")[1]; // Extract actual token after "Bearer"

  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

export { verifyToken };
