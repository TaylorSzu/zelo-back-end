const jwt = require("jsonwebtoken");

const JWT_SECRET = "SuaChaveSecretaAqui";

const authMiddleware = (req, res, next) => {
  // Buscar o token no cookie
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso negado. Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};

module.exports = authMiddleware;
