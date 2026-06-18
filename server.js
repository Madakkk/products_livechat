const express = require("express");

const app = express();

app.use(express.json());

const richMessage = {
  type: "rich_message",
  visibility: "all",
  template_id: "cards",
  elements: [
    {
      title: "Growth",
      subtitle: "$79/month billed annually, or $99 monthly",
      image: {
        url: "https://placehold.co/300x160?text=Growth",
        alternative_text: "Growth plan"
      },
      buttons: [
        {
          type: "url",
          text: "Tell me more",
          value: "https://www.text.com/pricing/",
          target: "new"
        }
      ]
    },
    {
      title: "Essential",
      subtitle: "$19/month billed annually, or $25 monthly",
      image: {
        url: "https://placehold.co/300x160?text=Essential",
        alternative_text: "Essential plan"
      },
      buttons: [
        {
          type: "url",
          text: "Tell me more",
          value: "https://www.text.com/pricing/",
          target: "new"
        }
      ]
    },
    {
      title: "Enterprise",
      subtitle: "Custom offer for larger teams",
      image: {
        url: "https://placehold.co/300x160?text=Enterprise",
        alternative_text: "Enterprise plan"
      },
      buttons: [
        {
          type: "url",
          text: "Learn more",
          value: "https://www.text.com/pricing/",
          target: "new"
        }
      ]
    }
  ]
};

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Text Plans Rich Message API"
  });
});

app.get("/plans", (req, res) => {
  res.json(richMessage);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
