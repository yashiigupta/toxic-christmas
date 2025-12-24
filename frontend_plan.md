# 🎄 Frontend Development Plan: Unqualified Opinions™️

**Role:** Expert React & Creative Developer
**Objective:** Build the frontend for a satirical "useless" AI app that judges users based on their facial expressions.
**Tech Stack:** React (Vite), Tailwind CSS, `face-api.js`, `react-webcam`.

---

## 🎨 Design System: "Toxic Christmas"
The app should look cozy and inviting, contrasting with the mean content.

**Color Palette (Tailwind Config):**
-   **Primary (Pastel Holly):** `#FFB7B2` (Soft red/pink)
-   **Secondary (Mistletoe):** `#B5EAD7` (Mint green)
-   **Background (Snow):** `#F9F9F9` (Off-white)
-   **Text (Coal):** `#4A4A4A` (Soft dark grey)
-   **Accent (Gold/Tinsel):** `#E2F0CB` (Pale yellow-green)

**Typography:**
-   Use a rounded, friendly font like **Quicksand** or **Nunito** (Google Fonts).

---

## 🧩 Component Architecture

### 1. Global Layout (`Layout.jsx`)
-   **Header:** "Unqualified Opinions™️" with a Santa hat icon.
-   **Footer:** "Made with 0% empathy for Code At Christmas."

### 2. Landing Page (`LandingPage.jsx`)
-   **Hero:** Large, centered text. "We judge you so you don't have to."
-   **Consent Modal:** A cute popup.
    -   *Text:* "By clicking 'Judge Me', you agree that this AI is unqualified, rude, and probably wrong."
    -   *Button:* "Hurt My Feelings" (Navigates to Main App).

### 3. Main App (`MainApp.jsx`)
-   **Layout:** Split screen (Desktop) or Stacked (Mobile).
-   **Left Panel (The Face):**
    -   `WebcamView`: Wrapper for `react-webcam`.
    -   `FaceOverlay`: Canvas overlay for `face-api.js` to draw detection boxes (optional, maybe just show the mood label).
    -   `MoodIndicator`: A badge showing the current detected mood (e.g., "Sad - 88%").
-   **Right Panel (The Judgment):**
    -   `OpinionCard`: A card that displays the text returned from the backend.
    -   `ActionButtons`:
        -   "Get Another Opinion" (Triggers new API call).
        -   "I Can't Take This" (Navigates to About).

### 4. About Page (`AboutPage.jsx`)
-   Explanation of the hackathon project.
-   "Why is this app so mean?" section.

---

## 🧠 Core Logic & Features

### A. Face Detection (`useFaceMood.js` hook)
1.  Load `face-api.js` models (`tinyFaceDetector`, `faceExpressionNet`) from the `/public/models` directory on mount.
2.  Run detection loop every 500ms-1000ms on the webcam video stream.
3.  Extract the dominant expression (Happy, Sad, Neutral, Surprised, Angry).
4.  **Important:** Do not send *images* to the backend. Only send the *detected mood string* (e.g., "happy").

### B. API Integration
-   **Endpoint:** `POST /api/judge`
-   **Payload:** `{ mood: "happy", confidence: 0.95 }`
-   **Response:** `{ opinion: "You're smiling? In this economy? Bold choice." }`

### C. Text-to-Speech (The Voice)
-   **Requirement:** The app must *speak* the judgment.
-   **Implementation:** Use the browser's `window.speechSynthesis` API.
-   **Voice Selection:** Iterate through `speechSynthesis.getVoices()` and try to find a voice that sounds slightly robotic or haughty (e.g., "Google UK English Female" or "Samantha").
-   **Trigger:** When the API response arrives, immediately trigger the `speak()` function.

---

## 📝 Implementation Steps for AI Developer

1.  **Initialize:** `npm create vite@latest frontend -- --template react`
2.  **Install Deps:** `npm install react-webcam face-api.js axios react-router-dom framer-motion` (for animations).
3.  **Tailwind:** Configure `tailwind.config.js` with the "Toxic Christmas" colors.
4.  **Models:** Download `face-api.js` weights (shard files) and place them in `public/models`.
5.  **Develop:** Build components in order: Layout -> Landing -> Webcam/Face Logic -> API Connection -> TTS.

---

## 💡 "Vibe" Instructions
-   **Animations:** Use `framer-motion` to make the "Opinion Card" pop in with a bounce. It makes the insult feel friendlier.
-   **Loading State:** While waiting for the API, show messages like "Consulting the spirits...", "Judging your hairline...", "Calculating worth...".
