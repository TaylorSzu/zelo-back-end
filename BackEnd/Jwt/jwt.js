import jwt from "jsonwebtoken";

// Defina a chave secreta e o tempo de expiração diretamente
const JWT_SECRET = 'SuaChaveSecretaAqui';
const JWT_EXPIRES = '1h'; // Defina o tempo de expiração desejado, por exemplo, 1 hora

const gerarToken = (userId, userType) => {
  return jwt.sign({ id: userId, type: userType }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });
};

const verificarToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { gerarToken, verificarToken };