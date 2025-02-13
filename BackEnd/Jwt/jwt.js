import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const gerarToken = (userId, userType) => {
  return jwt.sign({ id: userId, type: userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const verificarToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export { gerarToken, verificarToken };
