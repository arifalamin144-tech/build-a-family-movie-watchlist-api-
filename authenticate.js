import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Tidak ada Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan hasil decode ke req.user
    req.user = decoded;

    // Lanjut ke middleware berikutnya
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token.",
    });
  }
};
