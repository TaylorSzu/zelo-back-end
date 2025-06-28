const express = require("express");
const router = express.Router();
const mercadopago = require("../BankApi/mercadoPago.js");
const { Preference } = require("mercadopago");
const authMiddleware = require("../Jwt/middleware.js");

router.post("/pagamento/criar", authMiddleware, async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: "Produto Exemplo",
          quantity: 1,
          unit_price: 100.0,
          currency_id: "BRL",
        },
      ],
      back_urls: {
        success: "https://zelloapp.com.br/sucesso",
        failure: "https://zelloapp.com.br/falha",
        pending: "https://zelloapp.com.br/pendente",
      },
      auto_return: "approved",
    };

    const preferenceClient = new Preference(client);

    const response = await preferenceClient.create({ body: preference });

    res.json({ init_point: response.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar pagamento");
  }
});

module.exports = router;
