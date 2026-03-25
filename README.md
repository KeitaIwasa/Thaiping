# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/9e7d9b87-8c1f-4ba5-baf2-28d5873d15e0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

**Prerequisites:** Vercel account, Node.js

1. Login to Vercel (first time only):
   `npx vercel login`
2. Deploy to production:
   `npx vercel --prod --yes`
3. (Optional) Inspect the latest deployment:
   `npx vercel inspect`
