const usuario = require("../Models/userModel");
const Cuidador = require("../Models/cuidadorModel");
const Contratante = require("../Models/contratanteModel");

function registrarUsuario(user) {
  return usuario.create(user);
}

function listarUsuarios() {
  return usuario.findAll();
}

async function encontrarUsuario(id) {
  const user = await usuario.findByPk(id);
  if (!user) return null;

  let includeRelations = [];

  if (user.tipoUsuario === "Cuidador") {
    includeRelations.push({ model: Cuidador });
  } else if (user.tipoUsuario === "Paciente") {
    includeRelations.push({ model: Contratante });
  }

  return await usuario.findByPk(id, { include: includeRelations });
}

async function editarUsuario(id, user) {
  const usuarioEncontrado = await encontrarUsuario(id);
  if (usuarioEncontrado) {
    return await usuarioEncontrado.update(user);
  } else {
    return null;
  }
}

async function excluirUsuario(id, senha) {
  // Encontra o usuário pelo id e pela senha
  const usuarioEncontrado = await usuario.findOne({
      where: { id: id, senha: senha }
  });

  // Verifica se o usuário foi encontrado
  if (usuarioEncontrado) {
      // Se encontrado, exclui o usuário
      await usuarioEncontrado.destroy();
      return { message: "Usuário excluído com sucesso" };
  } else {
      return { error: "Usuário não encontrado ou senha incorreta" };
  }
}

// async function login(email, senha) {
//   const user = await usuario.findOne({ where: { email: email, senha: senha } });
//   return user || null;
// }

async function login(email, senha, tiposPermitidos = ["Cuidador", "cuidador", "Paciente", "paciente"]) {
  const user = await usuario.findOne({ where: { email, senha } });

  if (!user) {
    return { success: false, message: "Email ou senha incorretos." };
  }

  if (!tiposPermitidos.includes(user.tipoUsuario)) {
    return {
      success: false,
      message: `Usuário do tipo '${user.tipoUsuario}' não autorizado para login.`,
    };
  }

  return { success: true, user: user };
}

module.exports = {
  registrarUsuario,
  listarUsuarios,
  encontrarUsuario,
  editarUsuario,
  excluirUsuario,
  login,
};
