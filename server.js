const express = require("express");

const app = express();
app.use(express.json());

app.get("/plans", (req, res) => {
  res.json({
    products: [
      {
        regular_price: "29",
        title: "Starter",
        price: "29",
        id: "starter",
        currency: "USD",
        url: "https://www.text.com/pricing/",
        image_url: "https://via.placeholder.com/400x300?text=Starter"
      },
      {
        regular_price: "59",
        title: "Team",
        price: "59",
        id: "team",
        currency: "USD",
        url: "https://www.text.com/pricing/",
        image_url: "https://via.placeholder.com/400x300?text=Team"
      },
      {
        regular_price: "149",
        title: "Business",
        price: "149",
        id: "business",
        currency: "USD",
        url: "https://www.text.com/pricing/",
        image_url: "https://via.placeholder.com/400x300?text=Business"
      },
      {
        regular_price: "0",
        title: "AI Agent",
        price: "Contact Sales",
        id: "ai-agent",
        currency: "USD",
        url: "https://www.text.com/pricing/",
        image_url: "https://via.placeholder.com/400x300?text=AI+Agent"
      },
      {
        regular_price: "0",
        title: "Enterprise",
        price: "Custom",
        id: "enterprise",
        currency: "USD",
        url: "https://www.text.com/pricing/",
        image_url: "https://via.placeholder.com/400x300?text=Enterprise"
      }
    ]
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
