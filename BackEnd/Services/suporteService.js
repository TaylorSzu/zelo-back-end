const email = require("nodemailer");
const usuario = require("../Models/userModel.js");
const { Model } = require("sequelize");
const express = require("express");

const configGmail = email.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "zelloteams@gmail.com",
    pass: "nptthitczjvfbfjc",
  },
});

async function enviarEmail(userEmail, titulo, conteudo, userName) {
  let host = "zelloteams@gmail.com";

  configGmail
    .sendMail({
      from: `CHAMADO ${userName} <${userEmail}>`,
      to: `${host}`,
      subject: `${titulo}`,
      html: `<h4>${conteudo}</h4>`,
    })
    .then(() => console.log("email enviado"))
    .catch((err) => console.log("Deu erro", err));
}

module.exports = { configGmail, enviarEmail };
