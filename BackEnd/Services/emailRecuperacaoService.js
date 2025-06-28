const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zelloteams@gmail.com",
    pass: "nptthitczjvfbfjc", // senha de app do Gmail (já funcional)
  },
});

async function enviarEmailRecuperacao(email, token) {
  const link = `http://localhost:5173/registrarNovaSenha?token=${token}`;
  const html = `
    <p>Olá,</p>
    <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para continuar:</p>
    <p><a href="${link}" style="padding: 10px 20px; background-color: #0A68FF; color: white; text-decoration: none; border-radius: 5px;">Redefinir Senha</a></p>
    <p>Se você não solicitou a redefinição, ignore este e-mail.</p>
    <p>Zello Teams</p>
  `;

  const mailOptions = {
    from: "Zello Team  <zelloteams@gmail.com>",
    to: email,
    subject: "Recuperação de senha de acesso ao ZeloApp",
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de recuperação enviado para:", email);
    return true;
  } catch (erro) {
    console.error("Erro ao enviar e-mail de recuperação:", erro);
    return false;
  }
}

module.exports = { enviarEmailRecuperacao };
