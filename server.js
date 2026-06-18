const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Text Plans API"
  });
});

app.get("/plans", (req, res) => {
  res.json({
    products: [
      {
        regular_price: "99",
        title: "Growth",
        price: "79",
        id: "growth",
        currency: "USD",
        url: "https://www.text.com/pricing/",
      },
      {
        regular_price: "25",
        title: "Essential",
        price: "19",
        id: "essential",
        currency: "USD",
        url: "https://www.text.com/pricing/",
      },
      {
        regular_price: "",
        title: "Enterprise",
        price: "Custom",
        id: "enterprise",
        currency: "USD",
        url: "https://www.text.com/pricing/",
      }
    ]
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
