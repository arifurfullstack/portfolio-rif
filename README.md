# AI-Agent Portfolio

A personal portfolio website where robot cursors build the site live on screen, ready for screen-recording reels.

Built according to the spec from [@jai4z](https://app.notion.com/p/410735929e0a80ea9f37ebc4f242e51d).

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) App Router with React 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom High-Precision Brand SVGs
- **Typography**: Anton (Headings), Geist (Body), Geist Mono (Labels), Caveat Brush (Handwritten intro)
- **Palette**: Dark `#09090b` zinc base, single accent red `#ff3b2f`

---

## Quick Start

### 1. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/?agents=on](http://localhost:3000/?agents=on) in your browser.

---

## Key Features

1. **Signature Robot Cursors Animation**:
   - 12 named autonomous agent cursors (Scout, Layout, Typeset, Motion, QA, Deploy, Copy, Lint, Index, Render, Palette, Review).
   - Automatically adapts to 6 cursors on mobile screens.
   - Glides smoothly to elements, projects glowing blue wireframe bounding boxes with corner handles, then reveals content:
     - `data-build="type"`: Character-by-character typing.
     - `data-build="pop"`: Spring bounce scale.
     - `data-build="wipe"`: Left-to-right clip reveal.
   - No flash before start: Inline `<head>` script sets `.build-mode` before render.
   - Fast boot loader (`SYS_BOOT // AGENT_MESH_v4`) runs on initial load.

2. **Hero**:
   - Giant metallic word **PORTFOLIO** in Anton with a continuous light sheen sweep.
   - Centered black-and-white headshot standing on a soft radial red glow with bottom edge fading seamlessly into `#09090b`.
   - Left side: Handwritten "Hello, I'm", large name, red role title, 2-line bio, "View work" and "Resume PDF" actions, and location pill.
   - Right side: 3 real stats.

3. **Sections**:
   - **Work that ships**: 4 detailed project cards with technical bullets, real metrics, tech chips, and GitHub/Inspect links (no screenshots).
   - **Stack Architecture**: Dual-row infinite marquee moving with faded edges that pauses on hover.
   - **Chronological Record**: Connected timeline of experience, hackathons, and education.
   - **Engineering Taste & Philosophy**: 2 concise philosophy paragraphs, categorized skills grid, and 4 core principles.
   - **Contact & Footer**: Big call-to-action card, one-click copy email button with feedback, direct mailto, and social links.

4. **Floating Control Dock**:
   - **Pause (P)**: Halts/resumes the cursor build sequence.
   - **Agents ON/OFF (A)**: Toggles animation mode on or off, persisted to `localStorage`.
   - **Tour (T)**: Automatically scrolls the site smoothly from top to bottom (ease in, steady cruise, ease out) for screen-recording. Pressing `Esc` or manual scrolling cancels the tour.
   - URL flags:
     - `?agents=on` forces the animation even if reduced motion is enabled.
     - `?agents=off` disables the animation completely.

---

## Personalizing Your Data & Photo

1. **Replace your headshot**:
   - Put your cutout photo in `public/headshot.png` (transparent PNG, waist-up, black & white).
2. **Update your resume facts**:
   - Open [`data/portfolio.ts`](file:///Users/macminim2/riff/portfoliox/data/portfolio.ts) and customize your name, role, city, bio, projects, stats, and links.
   - Replace `public/resume.pdf` with your real `resume.pdf`.

---

## How to Record Your Reel

1. Open `http://localhost:3000/?agents=on` in Chrome.
2. Enter fullscreen (**F11** on Windows / **Cmd + Shift + F** on Mac) at 100% zoom.
3. Start screen recording (**Cmd + Shift + 5** on Mac, **Win + Alt + R** on Windows, or OBS).
4. Click **Tour** or press **T**.
5. Let the site auto-build and cruise down to the footer, then stop recording.
6. *For 9:16 vertical reels*: Open Chrome DevTools (`F12`), toggle Device Mode, pick an iPhone / Android dimension, and press **Tour**.

---

## Deploy Free on Vercel

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git remote add origin https://github.com/your-username/your-repo.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com).
3. Click **Add New > Project**, select your GitHub repository, and click **Deploy**.
4. Your portfolio is live with a free `.vercel.app` domain!
