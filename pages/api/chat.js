// pages/api/chat.js
import { OpenAI } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userMessage } = req.body;
    if (!userMessage) {
      return res.status(400).json({ error: "No userMessage provided." });
    }

    // Initialize OpenAI with new library usage
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Make sure .env.local has OPENAI_API_KEY
    });

    // Call GPT
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful Family Law AI assistant." },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    });

    const assistantMessage = response.choices[0].message.content;

    return res.status(200).json({ assistantMessage });
  } catch (error) {
    console.error("OpenAI Chat error:", error);
    return res.status(500).json({ error: "OpenAI API request failed." });
  }
}
