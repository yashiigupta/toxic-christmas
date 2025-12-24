# 🎄 Backend Development Plan: Unqualified Opinions™️

**Role:** Expert Node.js & AI Engineer
**Objective:** Build the backend API that generates sarcastic, unsolicited opinions based on user moods.
**Tech Stack:** Node.js, Express, Google Gemini API (`@google/generative-ai`).

---

## ⚙️ Server Architecture

### 1. Setup
-   **Framework:** Express.js
-   **Middleware:** `cors` (allow frontend access), `express.json()` (parse body).
-   **Environment:** `dotenv` for managing the `GEMINI_API_KEY`.

### 2. API Endpoints

#### `POST /api/judge`
-   **Input:**
    ```json
    {
      "mood": "happy",
      "confidence": 0.98
    }
    ```
-   **Process:**
    1.  Validate input.
    2.  Select a "Personality Persona" (see below).
    3.  Construct the prompt for Gemini.
    4.  Call Gemini API.
    5.  Return the text response.
-   **Output:**
    ```json
    {
      "opinion": "Oh, look at you, smiling like you didn't just spend 4 hours debugging a missing semicolon. Must be nice to be that delusional."
    }
    ```

---

## 🧠 AI Personality Engine (Gemini Integration)

### Configuration
-   **Model:** `gemini-pro` (text-only model is sufficient and fast).
-   **Temperature:** `0.9` (High creativity/randomness).
-   **Max Output Tokens:** `60` (Keep it short and punchy).

### System Prompt / Persona
The core of this app is the prompt. It must be strictly defined to prevent "helpful" AI behavior.

**Base System Instruction:**
> "You are Unqualified Opinions, a sarcastic, judgmental, and emotionally unavailable AI assistant.
> Your goal is to roast the user based on their facial expression.
> - NEVER offer advice or help.
> - NEVER be genuinely mean about appearance (no body shaming).
> - BE passive-aggressive, dismissive, or mockingly jealous.
> - Keep responses under 2 sentences.
> - The theme is 'Toxic Best Friend' or 'Grinch'."

### Dynamic Prompt Construction
When a request comes in, build the prompt dynamically:

**If Mood = "Happy":**
> "The user is smiling (Confidence: ${confidence}). Mock them for being happy when the world is on fire. Be jealous."

**If Mood = "Sad":**
> "The user looks sad. Don't comfort them. Say 'I told you so' or make it about yourself. Be dry."

**If Mood = "Neutral":**
> "The user has no expression. Accuse them of being a robot or boring."

**If Mood = "Surprised":**
> "The user looks surprised. Act like they should have seen this coming."

---

## 🎲 Chaos Features (Optional Extensions)

### 1. The "Gaslight" Function
-   10% of the time, ignore the actual mood and roast the *opposite* mood.
-   *Logic:* `if (Math.random() < 0.1) mood = invert(mood);`
-   *Prompt Add-on:* "Insist the user is feeling [fake mood] even if they aren't."

### 2. Rate Limiting (The "Ghosting" Feature)
-   If the same user (track via simple session ID or IP) asks for more than 5 opinions in 1 minute:
-   **Response:** "I'm bored of you. Go away." (Hardcoded, save API tokens).

---

## 📝 Implementation Steps for AI Developer

1.  **Initialize:** `npm init -y`
2.  **Install Deps:** `npm install express cors dotenv @google/generative-ai`
3.  **Structure:**
    -   `server.js` (Main entry)
    -   `routes/judge.js` (API logic)
    -   `services/gemini.js` (Gemini client wrapper)
4.  **Env:** Create `.env` file with `GEMINI_API_KEY=...`
5.  **Testing:** Use Postman or curl to test the prompt responses before connecting the frontend.

---

## 🔒 Safety & Guardrails
-   **Gemini Safety Settings:** Configure the safety settings to BLOCK `HARM_CATEGORY_HATE_SPEECH` and `HARM_CATEGORY_HARASSMENT` but ALLOW `HARM_CATEGORY_DANGEROUS_CONTENT` (often triggers on sarcasm) at a medium threshold. We want *mean*, not *unsafe*.
-   **Fallback:** If Gemini refuses to generate (due to safety filter), return a safe hardcoded roast: "I refuse to perceive you right now."
