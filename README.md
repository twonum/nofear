package.json                 project manifest + scripts
next.config.mjs              Next.js config
tailwind.config.js           Tailwind setup
public/                      static assets (icons, svgs, fonts)
src/
  app/                       Next.js App Router pages & layout (page.tsx, layout.tsx)
    SurveillanceConsole/     surveillance UI (entry for detection console)
    about/, contact/, sign-in/, sign-up/, terms/  static/info pages
  components/                UI components + object-detection and category models
    object-detection.js      client-side TF model runner, webcam + canvas overlay
    animals-detection-model.js
    vehicles-detection-model.js
    food-detection-model.js
    furniture-detection-model.js
    tools-detection-model.js
    DropdownMenu.tsx, Navbar.tsx, Output.tsx, etc.
  api.js                     axios client calling the Piston execute API (optional/extra)
  constants.js               language/version/code-snippets (used by api.js)
  middleware.ts              Next.js middleware (auth / routing hooks)
  hooks/, lib/, utils/, styles/  helpers, renderers (render-predictions), styling
README.md
