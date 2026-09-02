# No Fear (AI Vision)

No Fear is a browser-first real-time object detection and surveillance demo built with Next.js and TensorFlow.js. It runs inference in the user's browser (no server-side model hosting required), supports multiple detection categories (people, vehicles, animals, furniture, food, tools), and uses Clerk for authentication to protect the surveillance console.

## Features
- Real-time webcam inference using TensorFlow.js (coco-ssd)
- Multiple category detection modules (animals, vehicles, food, furniture, tools)
- Canvas overlay visualization for bounding boxes and labels
- Auth-gated UI (Clerk)
- Responsive, Tailwind CSS-powered design and a Surveillance Console demo page

## Tech stack
- Next.js (App Router)
- TypeScript + JavaScript
- TensorFlow.js (@tensorflow-models/coco-ssd)
- react-webcam
- Clerk for authentication (@clerk/nextjs)
- Tailwind CSS
- Axios (used in src/api.js for optional Piston API integration)

## Quick start

Prerequisites
- Node.js (14+ recommended)
- A Clerk account and project for authentication (or adjust auth code)

Install and run
```bash
git clone https://github.com/twonum/nofear.git
cd nofear
npm install
npm run dev
```
Open http://localhost:3000 and sign in to access the Surveillance Console. Grant camera permissions when prompted.

## Environment variables
Create a `.env.local` (or `.env`) file and add the authentication keys required by Clerk, for example:
```text
# Example — replace with your actual Clerk values
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
NEXT_PUBLIC_CLERK_FRONTEND_API=...
```
If you plan to use any external APIs (the repo contains `src/api.js` which calls the Piston execute API), add corresponding keys/endpoints as needed.

## Usage
- Sign in (routes are gated using Clerk).
- Go to "Surveillance Console" to start live detection.
- Use resolution buttons to pick webcam resolution.
- Canvas overlays show detected objects and bounding boxes.
- The `takeScreenshot` hook in `src/components/object-detection.js` is a placeholder where you can implement screenshot capture + upload or email logic.

## Important files
- `src/app/page.tsx` — main landing page and auth gating
- `src/app/SurveillanceConsole` — surveillance console entry (UI)
- `src/components/object-detection.js` — core client-side model loader + webcam loop
- `src/components/*-detection-model.js` — category-specific detection helpers
- `src/utils/render-predictions.js` — rendering helper for bounding boxes
- `src/api.js` — axios client calling the Piston API (optional)
- `src/middleware.ts` — Next.js middleware (auth / routing)

## Troubleshooting
- Model fails to load or is slow: ensure a stable network and enough client CPU. Consider lowering resolution or throttling detection interval.
- Webcam not available: check browser permissions and try a secure origin if required.
- Authentication issues: verify Clerk env vars and project configuration.
- Console errors: check browser console for TFJS model loading errors or CORS/network failures.

## Contributing
Contributions are welcome. A simple workflow:
1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit and push, then open a PR describing the change

## Extending
- Implement `takeScreenshot` in `src/components/object-detection.js` to save frames or upload to a server.
- Add server-side processing or event triggers for detections.
- Replace or fine-tune models for higher accuracy or additional classes.

## License
Add a license file to this repository (e.g., MIT) and update this section.

## Contact
Maintainer: Muhammad Taha Saleem — links included on the app footer (GitHub / LinkedIn).
