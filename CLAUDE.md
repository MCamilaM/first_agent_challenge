# CLAUDE.md

## Project Overview

Generative UI smart home assistant built with Next.js 14 (App Router) and the Vercel AI SDK. Streams React Server Components from the server to render dynamic UI based on AI tool calls. Demo covers home automation: cameras, climate/lights/locks hub, and energy usage visualization.

## Tech Stack

- **Framework:** Next.js 14.2.5 with App Router, React 18, TypeScript 5 (strict mode)
- **AI:** Vercel AI SDK (`ai` + `@ai-sdk/openai`) — uses `streamUI` and `createAI` for RSC streaming
- **Styling:** Tailwind CSS 3.4 with CSS custom properties (HSL), dark mode via `.dark` class
- **Animation:** Framer Motion
- **Validation:** Zod for tool parameter schemas
- **Charts:** D3-scale for energy usage visualization

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint (extends next/core-web-vitals)
```

## Project Structure

```
app/(preview)/
  actions.tsx    # Server actions: AI config, tool definitions (streamUI, createAI)
  page.tsx       # Client component: chat interface
  layout.tsx     # Root layout with AI provider
  globals.css    # Tailwind + CSS theme variables

components/
  message.tsx    # Message rendering (text + streamed components)
  camera-view.tsx, hub-view.tsx, usage-view.tsx  # Tool-rendered UI components
  icons.tsx      # SVG icon components
  data.ts        # Mock data generator for usage metrics
  use-scroll-to-bottom.ts  # Auto-scroll hook (MutationObserver)
```

## Architecture

- **Server/Client split:** `actions.tsx` is `"use server"` (AI logic + tool execution); UI components are `"use client"`
- **AI State:** Managed via `createAI` context provider with `getMutableAIState` on server
- **Tool-based rendering:** 4 tools — `viewCameras`, `viewHub`, `updateHub`, `viewUsage` — each returns streaming React components
- **Streaming:** Text streams progressively via `createStreamableValue`; tool UIs render on-demand

## Environment

Requires `OPENAI_API_KEY` — see `.env.example`.

## Code Conventions

- PascalCase for React components, camelCase for hooks/utilities
- Tailwind utility classes only (no CSS modules or styled-components)
- Path alias: `@/*` maps to project root
- Zod schemas for all tool parameters
- Interfaces for data structures (`Hub`, `Usage`, `Usages`)
