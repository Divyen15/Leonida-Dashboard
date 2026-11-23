/**
 * Phase 2 — Optional Server-Side Gemini API Proxy
 * 
 * SECURITY & BILLING SAFEGUARDS:
 * - The GEMINI_API_KEY is NEVER exposed to the frontend or browser.
 * - Enforces strict rate limiting: max 1 request every 10 seconds.
 * - Caps input context to bounded evidence snippets (max 1000 tokens).
 * - Requires strict evidence citations and output format.
 * - If no GEMINI_API_KEY is configured in .env, falls back gracefully to
 *   Phase 1 deterministic summaries without failing.
 * 
 * NOTE ON GOOGLE AI PRO:
 * Google AI Pro is a consumer plan for chat interfaces (Gemini Advanced).
 * Programmatic API keys are generated separately at https://aistudio.google.com/
 * Google AI Studio provides a free tier with rate limits that requires NO credit card.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';

// Basic .env parser (zero external dependencies required)
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [k, ...v] = trimmed.split('=');
        if (k && v.length > 0) {
          process.env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    }
  }
}

loadEnv();

const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

let lastRequestTime = 0;
const RATE_LIMIT_MS = 10000; // 10 seconds between API requests

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check endpoint
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      phase: 2,
      aiEnabled: Boolean(GEMINI_API_KEY),
      geminiConfigured: Boolean(GEMINI_API_KEY),
      message: GEMINI_API_KEY 
        ? 'Gemini API is configured for server-side summaries.'
        : 'Running in Phase 1 mode. GEMINI_API_KEY not configured in .env.'
    }));
    return;
  }

  // Summarize endpoint
  if (req.url === '/api/summarize' && req.method === 'POST') {
    if (!GEMINI_API_KEY) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        enabled: false,
        source: 'deterministic',
        message: 'Gemini API key is not configured. Using Phase 1 deterministic rule-based analysis.'
      }));
      return;
    }

    // Rate limiting check
    const now = Date.now();
    if (now - lastRequestTime < RATE_LIMIT_MS) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Rate limit: Please wait a few seconds between AI requests.'
      }));
      return;
    }
    lastRequestTime = now;

    let bodyStr = '';
    req.on('data', chunk => {
      bodyStr += chunk;
      if (bodyStr.length > 10000) { // Max 10KB input protection
        req.destroy();
      }
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(bodyStr || '{}');
        const changeTitle = payload.title || '';
        const changeContext = (payload.context || '').substring(0, 1500);

        const prompt = `You are an expert reverse engineering educator explaining GitHub progress on Leonida (an open-source project recompiling the Xbox Series version of Grand Theft Auto VI for PC) to a high school programming student.

CRITICAL ACCURACY RULES:
1. Never claim the game boots, displays graphics, or is playable unless explicitly proven.
2. Clearly state what this change DOES NOT prove.
3. Distinguish tests and stubs from real game execution.
4. Keep the explanation under 120 words.

EVIDENCE CONTEXT:
Title: ${changeTitle}
Details: ${changeContext}

Respond in strict JSON with:
{
  "simpleMeaning": "1 sentence explanation in plain English",
  "whyItMatters": "Why this change matters to the development pipeline",
  "whatItDoesNotProve": "Explicit statement of what this does NOT prove",
  "closerToBooting": "Specific impact on boot path"
}`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const apiResponse = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 300,
              responseMimeType: 'application/json'
            }
          })
        });

        if (!apiResponse.ok) {
          const errText = await apiResponse.text();
          throw new Error(`Gemini API error HTTP ${apiResponse.status}: ${errText}`);
        }

        const data = await apiResponse.json();
        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = JSON.parse(textContent || '{}');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          enabled: true,
          source: 'gemini-1.5-flash',
          result: parsed
        }));

      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: err.message,
          fallback: 'Using deterministic analysis.'
        }));
      }
    });
    return;
  }

  // Not found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`[Leonida Watch API Proxy] Running on http://localhost:${PORT}`);
  console.log(`[Leonida Watch API Proxy] AI Status: ${GEMINI_API_KEY ? 'Configured (Phase 2)' : 'Phase 1 Deterministic (Free / No Key Required)'}`);
});
