# UpNext Marketing — Website

Marketing site for **UpNext Marketing**, a video-led agency serving local
businesses in the Los Angeles / Glendale area.

The site has one job: get the visitor to fill out the lead form. Everything else
exists to make that feel easy.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · GSAP +
ScrollTrigger · Lenis smooth scroll · deploys to Vercel.

---

## 1. Run it locally

```bash
npm install
npm run dev            # http://localhost:3000
```

Other commands:

```bash
npm run build          # production build
npm start              # serve the production build
npm run typecheck      # TypeScript check, no emit
npm run lint           # Next.js lint
```

---

## 2. Editing the site — one file

**All copy, links, client logos, quotes, numbers, and media paths live in
[`content/content.ts`](content/content.ts).** You never need to open a component
to change words on the site.

Open that file and edit the text between the quotes. Save, and the page updates.

Everything not yet delivered is marked `PLACEHOLDER`. To find them all:

```bash
grep -n PLACEHOLDER content/content.ts
```

### Where each placeholder lives

| What | Where in `content/content.ts` | How to swap |
|---|---|---|
| **Hero reel** (background video on the homepage) | `media.heroReel` | Put the file in `public/media/`, then set `src: '/media/your-reel.mp4'` and `poster: '/media/your-reel-poster.jpg'` |
| **Work clips** (homepage rail) | `workShowcase.items[].src` / `.poster` | Same as above, one per clip |
| **Work page projects** | `workPage.projects[].src` / `.poster` | Same as above |
| **Founder photo / clip** | `media.founder` | Same as above (an image path works too) |
| **Client logos** | `proof.items[].logo` and `clientLogos.items[].logo` | Put files in `public/logos/`, then set `logo: '/logos/papas.svg'`. While `logo` is `''` a labelled placeholder box shows instead |
| **Client quotes** | `proof.items[].quote` | Replace the `[CLIENT QUOTE …]` text with their words |
| **Result numbers** | `proof.items[].metric` | Set `value` to the real figure, add `prefix`/`suffix` (e.g. `prefix: '+'`, `suffix: '%'`), write the `label`, and **set `placeholder: false`** — that switches on the count-up animation |
| **About page story** | `aboutPage.lead`, `aboutPage.body`, `aboutPage.founder` | Replace the bracketed placeholder copy |
| **Behind-the-scenes stills** | `aboutPage.behindTheScenes.items[].src` | Put files in `public/media/` and set the paths |
| **Instagram / booking links** | `socials` | Set the real URLs. `bookACall: ''` hides that link on `/start` |
| **Phone number** | `site.phone` | Set it to show it in the footer; leave `''` to hide |

Videos should be compressed MP4 (H.264) with a matching poster image. The poster
loads first so the page stays fast; the video enhances it.

### The logo

The site currently draws the UpNext mark as inline SVG (cyan circle, white "UP"
with the arrow in the U, over "NEXT."), so there is no missing-image state.

To use the client's real file:

1. Save it as `public/logo/upnext.svg` (and `public/logo/upnext-white.svg` for
   the knockout version used on cyan backgrounds). PNG works too — change the
   extension in the component.
2. In [`components/Logo.tsx`](components/Logo.tsx), set `USE_IMAGE_FILES = true`.

An SVG is strongly preferred over PNG — it stays sharp at every size.

### Swapping the headline font

`content/content.ts` → `theme.headlineFont`. Three options, one word to change:

- `'clash'` — **Clash Display** (default; modern, characterful, matches the
  logo's confidence)
- `'anton'` — Anton (condensed, closest to the logo's weight)
- `'archivo'` — Archivo Black/Expanded (bold, wide, neutral)

Body text is Inter throughout.

---

## 3. Wiring the form to GoHighLevel

The two-step form is already built and validated. It just needs somewhere to
send leads. Copy `.env.example` to `.env.local` and fill in **one** of these:

### Option A — GHL inbound webhook (recommended)

Keeps the custom two-step form, which completes better than one long form.

1. In GoHighLevel: **Automation → Workflows → Create Workflow → Add New Trigger
   → Inbound Webhook.**
2. Copy the webhook URL it gives you.
3. Put it in `.env.local`:

   ```
   GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/your-webhook-id
   ```

4. In the workflow, map the incoming fields onto the contact, then add your
   text/email follow-up actions.

The payload posted to GHL looks like this:

```json
{
  "first_name": "Jane",
  "last_name": "Alvarez",
  "full_name": "Jane Alvarez",
  "business_name": "Papas Meat & Seafood",
  "industry": "Restaurant / Food & Beverage",
  "phone": "818-555-0134",
  "email": "jane@papasmeat.com",
  "marketing_challenge": "We get walk-ins but nobody finds us online.",
  "monthly_budget": "$2,500 – $5,000 / month",
  "source": "/",
  "submitted_at": "2026-01-01T00:00:00.000Z"
}
```

The URL is read server-side only ([`app/api/lead/route.ts`](app/api/lead/route.ts)),
so it never appears in the browser.

**With `GHL_WEBHOOK_URL` unset**, the form still works end to end — the lead is
printed to the terminal instead of being sent. That makes it safe to test before
the CRM is connected.

### Option B — embed a GHL-hosted form

If you would rather manage fields inside GoHighLevel, set:

```
NEXT_PUBLIC_GHL_FORM_EMBED_URL=https://api.leadconnectorhq.com/widget/form/your-form-id
```

The GHL form then replaces the custom two-step form everywhere it appears. (The
custom form is the better default — it asks for less up front.)

---

## 4. Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Vercel
   detects Next.js — no settings to change.
3. Under **Environment Variables**, add `GHL_WEBHOOK_URL`. Optionally add
   `NEXT_PUBLIC_SITE_URL` once the real domain is live — but only with a real
   value. Leaving it blank is fine (the site falls back to Vercel's own
   deployment URL, then to a default), and the build will not fail either way.
4. Deploy. Every push to the branch redeploys automatically.
5. **Settings → Domains** to point `upnextmarketing.com` at it.

After changing an environment variable, redeploy for it to take effect.

---

## 5. How the site is put together

```
app/
  layout.tsx            root shell: fonts, smooth scroll, metadata
  (site)/               pages that get the nav + footer
    page.tsx            HOMEPAGE
    work/ services/ about/
  (bare)/start/         /start — QR landing page, deliberately no nav/footer
  api/lead/route.ts     form -> GoHighLevel
components/             UI pieces (Hero, WorkShowcase, ProofBand, LeadForm, …)
content/content.ts      >>> ALL EDITABLE CONTENT <<<
lib/motion.ts           GSAP setup + the shared scroll-reveal
app/globals.css         brand tokens (colour, type, spacing, motion)
```

### Pages

| Route | Purpose |
|---|---|
| `/` | One concise scroll: hero → work → proof → services → about → **the form** |
| `/work` | Fuller portfolio. `#reel` anchors the full reel |
| `/services` | Each service explained by outcome |
| `/about` | Founder story, values, behind the scenes |
| `/start` | QR-code / t-shirt landing page. One dominant CTA, secondary links below. Not indexed by search engines |

### Brand tokens

Colours, fonts, spacing and easing are defined once at the top of
`app/globals.css` and consumed through Tailwind — there are no hardcoded hex
values in components. Each colour is declared twice: as a hex (for gradients and
SVG) and as RGB channels (which is what makes `bg-cyan/10` opacity work).
**Change both when editing a colour.**

Spacing follows an 8px grid: Tailwind's `p-1` is 8px, `p-2` is 16px, `p-3` is
24px, and so on.

### Motion

Scroll animation is intentionally bold in a few places and calm everywhere else:

- Hero headline reveals word by word; the reel fades and scales in behind it
- The work showcase **pins** on desktop while the clips advance sideways
- Client logos stagger in; result numbers count up from zero
- Sections fade and rise as they enter view
- The nav gains a solid background after the hero

Every one of these is disabled under `prefers-reduced-motion`, where the site
falls back to plain native scrolling with all content visible. Pinning is also
skipped below 1024px, so nothing on a phone delays reaching the form.

To animate something new: put it inside a `<Reveal>` wrapper and add
`data-reveal` to the elements that should move.

---

## 6. Guardrails baked into the site

- **No pricing anywhere.** Pricing happens on the call.
- **The funnel/automation is never explained.** "The Growth System" is sold by
  result only. Keep it that way when editing copy.
- **Client names are used sparingly** — logo + quote + one number is the pattern.
  Please don't turn the proof band into a case-study wall.

---

## 7. Notes on decisions and deviations

Everything in the brief is implemented. A few judgement calls worth knowing:

1. **Framer Motion was not installed.** GSAP + ScrollTrigger covers every
   animation in the brief, and CSS transitions handle hover/focus. Adding a
   second animation library would have meant more JavaScript for no gain. It is
   easy to add later if you want it.

2. **Fonts load via `<link>` tags rather than `next/font`.** This keeps the build
   working without network access to the font CDNs and lets the Clash Display /
   Anton / Archivo swap be a one-word change in `content.ts`. If you later
   self-host the fonts, swap the `<link>` tags in `app/layout.tsx` for
   `@font-face` rules.

3. **`/start` sits in its own route group** (`app/(bare)/`) so it renders with no
   nav and no footer. A link tree with a full site nav isn't a link tree.

4. **The form posts to an internal API route**, not straight to GoHighLevel, so
   the webhook URL stays server-side and the payload gets validated twice.

5. **The site's base URL is resolved through
   [`lib/site-url.ts`](lib/site-url.ts)**, never `new URL(process.env…)`
   directly. Next.js evaluates page metadata during the build, so one blank
   environment variable reaching `new URL('')` fails the entire production
   build. The resolver tries `NEXT_PUBLIC_SITE_URL`, then `VERCEL_URL`, then
   `site.url` from `content.ts`, then a hardcoded default — rejecting blank and
   malformed values at each step, so it can never return an empty string.

6. **The Growth System card is styled distinctly (cyan) but doesn't span two
   columns.** A spanning card left a visible hole in the grid; colour marks it as
   the flagship instead.

7. **Placeholder media is a branded animated gradient**, not a stock video. It
   reads as intentional rather than broken, and clearly labels itself so no
   unswapped asset can quietly ship.

### Still needed from the client

- The video reel + client clips (MP4 + poster frames)
- Client logo files for Papas Meat & Seafood and Dr. Amir Orthodontics
- The real testimonial quotes and result numbers
- Founder photo/clip, the About story copy, and the founder's name
- The UpNext logo as SVG, if one exists
- Instagram URL, booking link, business phone number
- The GoHighLevel webhook URL
