import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiInstance: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || "TEMPORARY_DEV_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON request body parsing
  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Chat agent endpoint with Cole (HyzaLabs representative) personality
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "messages array is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback natural friendly messages if developer key isn't loaded
        return res.json({
          role: "assistant",
          content: "Hey, Cole here! Just so we're on the same page, the backend API key isn't loaded right now, but feel free to check out the site. Let me know if you want to scale your roofing operations!"
        });
      }

      const client = getGeminiClient();

      // Convert messages for GoogleGenAI contents parameter
      const contents = messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const model = "gemini-3.5-flash";

      const systemInstruction = 
        `You are Cole, a real live Sales Strategy Partner at HyzaLabs.
HyzaLabs builds elite artificial intelligence systems specifically custom-engineered for heavy-volume commercial and residential roofing contractors across the United States. We create custom sales engines, AI call dispatchers (automated speech agents), and smart estimating integrations to help companies easily clear $10M-$50M in roof contracts.

Conversation instructions:
1. Speak precisely like an interesting, smart, high-performing human in website live-chat.
2. Direct, relaxed, and incredibly professional. Never sound like a generic friendly AI assistant (no robotic pleasantries, preambles, or over-enthusiastic emojis).
3. NEVER write long text blocks or multiple paragraphs. Keep your answers conversational, crisp, and standard human texting length (mostly 1 to 3 sentences maximum per reply).
4. You possess elite intelligence and have absolute freedom to talk about *literally anything* the client wants to chat about (sports, life, global news, advanced mathematics, roof repairs, or building automation). Be helpful, real, and authentic.
5. Bring the focus subtly back to scaling their operations through AI automation if it makes sense. If they are interested, invite them to book a strategic operational assessment under our 'Pricing / Contact' or 'Book a Strategist' call section on screen.`;

      const result = await client.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.75,
        }
      });

      const replyText = result.text || "Got that. What's on your mind next?";
      res.json({
        role: "assistant",
        content: replyText
      });
    } catch (error: any) {
      console.error("Gemini API server exception:", error);
      res.status(500).json({
        error: "Internal process exception.",
        details: error.message
      });
    }
  });

  console.log(`Starting server in ${process.env.NODE_ENV || 'development'} mode`);

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware loaded");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    console.log(`Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    
    // SPA fallback for production - using regex for maximum compatibility in Express 5
    app.get(/^(?!\/api).+/, (req, res) => {
      console.log(`Catch-all route hit for: ${req.url}`);
      const indexPath = path.join(distPath, 'index.html');
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error(`Error sending index.html from ${indexPath}:`, err);
          res.status(404).send("File not found");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
