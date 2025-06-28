const Usuario = require("../Models/userModel");
const Cuidador = require("../Models/cuidadorModel");
const Contratante = require("../Models/contratanteModel");

function registrarUsuario(user) {
  return Usuario.create(user);
}

function listarUsuarios() {
  return Usuario.findAll();
}

async function encontrarUsuario(id) {
  const user = await Usuario.findByPk(id);
  if (!user) return null;

  let includeRelations = [];

  if (user.tipoUsuario === "Cuidador") {
    includeRelations.push({ model: Cuidador });
  } else if (user.tipoUsuario === "Paciente") {
    includeRelations.push({ model: Contratante });
  }

  return await Usuario.findByPk(id, { include: includeRelations });
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
  const usuarioEncontrado = await Usuario.findOne({
    where: { id, senha },
  });

  if (usuarioEncontrado) {
    await usuarioEncontrado.destroy();
    return { message: "Usuário excluído com sucesso" };
  } else {
    return { error: "Usuário não encontrado ou senha incorreta" };
  }
}

async function login(
  email,
  senha,
  tiposPermitidos = ["Cuidador", "cuidador", "Paciente", "paciente"]
) {
  const user = await Usuario.findOne({
    where: { email, senha },
    include: [
      { model: Contratante, attributes: ["id"], required: false },
      { model: Cuidador, attributes: ["id"], required: false },
    ],
  });

  if (!user) {
    return { success: false, message: "Email ou senha incorretos." };
  }

  if (!tiposPermitidos.includes(user.tipoUsuario)) {
    return {
      success: false,
      message: `Usuário do tipo '${user.tipoUsuario}' não autorizado para login.`,
    };
  }

  const contratanteId =
    user.Contratantes && user.Contratantes.length > 0
      ? user.Contratantes[0].id
      : null;
  const cuidadorId =
    user.Cuidadores && user.Cuidadores.length > 0
      ? user.Cuidadores[0].id
      : null;

  return {
    success: true,
    user: {
      id: user.id,
      nome: user.nome, // <-- adiciona aqui
      tipoUsuario: user.tipoUsuario,
      contratanteId,
      cuidadorId,
      email: user.email,
    },
  };
}



async function logout(id) {
  return { success: true, message: "Logout realizado com sucesso." };
}

async function buscarPorEmail(email) {
  return await Usuario.findOne({ where: { email } });
}

async function registrarNovaSenha(id, novaSenha) {
  const user = await Usuario.findByPk(id);
  if (!user) return false;

  await user.update({ senha: novaSenha });
  return true;
}

module.exports = {
  registrarUsuario,
  listarUsuarios,
  encontrarUsuario,
  editarUsuario,
  excluirUsuario,
  buscarPorEmail,
  registrarNovaSenha,
  logout,
  login,
};
