const express = require("express");

const app = express();

app.use(express.json());

const plans = [
  {
    regular_price: "99",
    title: "Growth",
    price: "79",
    id: "growth",
    currency: "USD",
    url: "https://www.text.com/pricing/",
    image_url: "https://placehold.co/300x160?text=Growth",
    buttons: [
      {
        text: "Tell me more",
        type: "postback",
        postback_id: "plan_growth",
        button_value: "growth"
      }
    ]
  },
  {
    regular_price: "25",
    title: "Essential",
    price: "19",
    id: "essential",
    currency: "USD",
    url: "https://www.text.com/pricing/",
    image_url: "https://placehold.co/300x160?text=Essential",
    buttons: [
      {
        text: "Tell me more",
        type: "postback",
        postback_id: "plan_essential",
        button_value: "essential"
      }
    ]
  },
  {
    regular_price: "",
    title: "Enterprise",
    price: "Custom",
    id: "enterprise",
    currency: "USD",
    url: "https://www.text.com/pricing/",
    image_url: "https://placehold.co/300x160?text=Enterprise",
    buttons: [
      {
        text: "Learn more",
        type: "postback",
        postback_id: "contact_sales",
        button_value: "contact sales"
      }
    ]
  }
];

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Text Plans API"
  });
});

app.get("/plans", (req, res) => {
  res.json({
    products: plans
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
