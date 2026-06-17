import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const TEXT_ACCESS_TOKEN = process.env.TEXT_ACCESS_TOKEN;

app.post("/webhook/plans-carousel", async (req, res) => {
  try {
    const { chat_id, thread_id } = req.body;

    if (!TEXT_ACCESS_TOKEN) {
      return res.status(500).json({
        ok: false,
        error: "Missing TEXT_ACCESS_TOKEN environment variable"
      });
    }

    if (!chat_id || !thread_id) {
      return res.status(400).json({
        ok: false,
        error: "Missing chat_id or thread_id"
      });
    }

    const plans = JSON.parse(fs.readFileSync("./plans.json", "utf8"));

    const elements = plans.map((plan) => ({
      title: plan.name,
      subtitle: `${plan.price}\n${plan.description}`,
      buttons: [
        {
          type: "url",
          text: "View plan",
          value: plan.url
        }
      ]
    }));

    const event = {
      type: "rich_message",
      template_id: "cards",
      elements
    };

    const response = await fetch(
      "https://api.livechatinc.com/v3.5/agent/action/send_event",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TEXT_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id,
          thread_id,
          event,
          visibility: "all"
        })
      }
    );

    const data = await response.json();

    return res.status(response.ok ? 200 : response.status).json({
      ok: response.ok,
      result: data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "Text plans carousel webhook"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
