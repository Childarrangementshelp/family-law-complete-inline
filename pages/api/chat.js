// pages/api/chat.js
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  try {
    const { userMessage } = req.body;
    if (!userMessage) {
      return res.status(400).json({ error: "No userMessage provided." });
    }

    // 1. Setup OpenAI
    const config = new Configuration({
      apiKey: process.env.OPENAI_AI_KEY,
    });
    const openai = new OpenAIApi(config);

    // 2. Call GPT
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful Family Law AI assistant." },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    });

    const assistantMessage = response.data.choices[0].message.content;
    return res.status(200).json({ assistantMessage });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
