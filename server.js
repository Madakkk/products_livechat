import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const TEXT_CLIENT_ID = process.env.TEXT_CLIENT_ID;
const TEXT_CLIENT_SECRET = process.env.TEXT_CLIENT_SECRET;
const TEXT_AGENT_ID = process.env.TEXT_AGENT_ID;

async function getAccessToken() {
  const credentials = Buffer.from(
    `${TEXT_CLIENT_ID}:${TEXT_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch("https://accounts.livechat.com/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials"
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Token request failed: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "Text plans carousel webhook"
  });
});

app.post("/webhook/plans-carousel", async (req, res) => {
  try {
    const { chat_id, thread_id } = req.body;

    if (!TEXT_CLIENT_ID) {
      return res.status(500).json({
        ok: false,
        error: "Missing TEXT_CLIENT_ID environment variable"
      });
    }

    if (!TEXT_CLIENT_SECRET) {
      return res.status(500).json({
        ok: false,
        error: "Missing TEXT_CLIENT_SECRET environment variable"
      });
    }

    if (!TEXT_AGENT_ID) {
      return res.status(500).json({
        ok: false,
        error: "Missing TEXT_AGENT_ID environment variable"
      });
    }

    if (!chat_id || !thread_id) {
      return res.status(400).json({
        ok: false,
        error: "Missing chat_id or thread_id"
      });
    }

    const accessToken = await getAccessToken();
    const plans = JSON.parse(fs.readFileSync("./plans.json", "utf8"));

    const addAgentResponse = await fetch(
      "https://api.livechatinc.com/v3.5/agent/action/add_user_to_chat",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id,
          user_id: TEXT_AGENT_ID,
          user_type: "agent",
          visibility: "all",
          ignore_requester_presence: true
        })
      }
    );

    const addAgentData = await addAgentResponse.json();

    if (!addAgentResponse.ok) {
      return res.status(addAgentResponse.status).json({
        ok: false,
        step: "add_user_to_chat",
        error: addAgentData
      });
    }

    const elements = plans.map((plan) => ({
      title: plan.name,
      subtitle: [plan.price, ...plan.features].join("\n"),
      buttons: [
        {
          type: "url",
          text: plan.button_text,
          value: plan.url
        }
      ]
    }));

    const event = {
      type: "rich_message",
      template_id: "cards",
      elements
    };

    const sendEventResponse = await fetch(
      "https://api.livechatinc.com/v3.5/agent/action/send_event",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

    const sendEventData = await sendEventResponse.json();

    if (!sendEventResponse.ok) {
      return res.status(sendEventResponse.status).json({
        ok: false,
        step: "send_event",
        error: sendEventData
      });
    }

    return res.json({
      ok: true,
      step: "completed",
      add_user_to_chat: addAgentData,
      send_event: sendEventData
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
