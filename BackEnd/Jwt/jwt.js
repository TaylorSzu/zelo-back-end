const jwt = require("jsonwebtoken");

// Defina a chave secreta e o tempo de expiração diretamente
const JWT_SECRET = "SuaChaveSecretaAqui";
const JWT_EXPIRES = "1h"; // Exemplo: 1 hora

const gerarToken = (userId, userType, contratanteId, cuidadorId) => {
  return jwt.sign(
    { id: userId, contratanteId, cuidadorId, type: userType },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES,
    }
  );
};

const verificarToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { gerarToken, verificarToken };
