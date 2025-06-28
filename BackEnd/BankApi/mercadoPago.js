const mercadoPago = require("mercadopago");
const dotenv = require("dotenv");
const { access } = require("fs");
dotenv.config();

const bankAPI = new mercadoPago.MercadoPagoConfig({
  accessToken:
    "TEST-7755870513264090-062218-985a746e42894918711918068ab7ad03-1214525747",
});

const devolucao = new mercadoPago.PaymentRefund(bankAPI);
module.exports = {
  bankAPI,
  devolucao
};
