import express from "express";
import Groq from "groq-sdk";
import Chat from "../models/Chat.js";
import protect from "../middleware/protect.js";

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a knowledgeable academic assistant helping students and researchers.
- Answer questions clearly and accurately
- Cite sources or methodologies when relevant
- If a question is outside your knowledge, say so honestly
- Use plain language but do not oversimplify
- Format code, equations, or lists when helpful`;

// Get all chats for user
router.get("/", protect, async (req, res) => {
  const chats = await Chat.find({ userId: req.user._id })
    .sort({ updatedAt: -1 })
    .select("title updatedAt");
  res.json(chats);
});

// Get single chat with messages
router.get("/:id", protect, async (req, res) => {
  const chat = await Chat.findOne({ _id: req.params.id, userId: req.user._id });
  if (!chat) return res.status(404).json({ error: "Chat not found" });
  res.json(chat);
});

// Create new chat
router.post("/", protect, async (req, res) => {
  const chat = await Chat.create({
    userId: req.user._id,
    title: "New conversation",
    messages: [],
  });
  res.json(chat);
});

// Send message in a chat
router.post("/:id/message", protect, async (req, res) => {
  try {
    const { content } = req.body;
    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    // Add user message
    chat.messages.push({ role: "user", content });

    // Update title from first message
    if (chat.title === "New conversation") {
      chat.title = content.slice(0, 38);
    }

    // Build history for Groq
    const history = chat.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
    });

    const reply = response.choices[0].message.content;
    chat.messages.push({ role: "assistant", content: reply });
    await chat.save();

    res.json({ reply, chat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete a chat
router.delete("/:id", protect, async (req, res) => {
  await Chat.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.json({ success: true });
});

export default router;
