const mercadoPago = require("mercadopago");
const dotenv = require("dotenv");
const { access } = require("fs");
dotenv.config();

mercadoPago.MercadoPagoConfig({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
})