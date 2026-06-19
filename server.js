const express = require("express");

const app = express();
app.use(express.json());

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
        image_url: "https://via.placeholder.com/400x300?text=Growth"
      },
       {
        regular_price: "25",
        title: "Essential",
        price: "19",
        id: "essential",
        currency: "USD",
        url: "https://www.text.com/pricing/",
        image_url: "https://via.placeholder.com/400x300?text=Essential"
      },
      {
        regular_price: "custom",
        title: "Enterprise",
        price: "Custom offer",
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
