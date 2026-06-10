# Portfolio Landing Page Redesign

Date: 2026-06-11

## Goal

Replace the current "AI slop" visual style (rainbow purple/cyan/pink gradients,
heavy glassmorphism, floating blur blobs, gradient text, fake skill-percentage
bars, emoji used as UI elements/icons) with a minimal editorial design with a
developer-focused identity: dark, near-monochrome, single emerald accent,
Inter + JetBrains Mono pairing, flat surfaces, restrained motion.

No emojis anywhere in the UI (including data-driven labels like duration/role
badges and empty states).

## Scope

In scope: `app/page.tsx` and its direct children rendered there —
`components/Navigation.tsx`, `components/Hero.tsx`, `components/About.tsx`,
`components/Skills.tsx`, `components/Projects.tsx`, `components/Contact.tsx`,
`components/WhatsAppFab.tsx` — plus shared theme files: `app/globals.css`,
`tailwind.config.js`, `app/layout.tsx` (font setup).

Out of scope: `/projects/[slug]` detail page, `/admin/*`, `/login`, auth
pages. These keep their current styling for now; a follow-up redesign can
reuse the same tokens later.

`data/projects.json` / Supabase project records are not changed. Fields like
`image` (emoji) and `gradient` simply stop being read by the redesigned
`Projects` card; they remain in the type/schema for the (out-of-scope) detail
page.

## Token strategy: additive, not destructive

`tailwind.config.js` and `app/globals.css` are shared by the landing page AND
the out-of-scope pages (`/admin/*`, `/login`, `/projects/[slug]`,
`ImageUpload`, `RichTextEditor`), which use `accent-purple`, `accent-cyan`,
`accent-pink`, `accent-green`, `accent-orange`, `.glass`, `.glass-dark`,
`.gradient-text`, `.bg-gradient-cyber`, and `animate-float` extensively.

**None of these existing tokens/classes/keyframes are removed or renamed.**
New tokens are added alongside them. The redesigned landing-page components
simply stop using the old tokens/classes and use the new ones instead.

## Design tokens

### Colors (tailwind.config.js)

Add to the existing `theme.extend.colors`, without touching `background`,
`foreground`, or the existing `accent.{purple,pink,cyan,green,orange}` keys:

- `surface`: `#131316` — new, for cards/panels (flat, no blur)
- `muted`: `#8a8a8f` — new, secondary text
- `accent.DEFAULT`: `#34d399` (emerald-400) — added as the `DEFAULT` key
  inside the existing `accent` object, so `accent-purple` etc. keep working
  while `accent` alone (i.e. `text-accent`, `bg-accent`, `border-accent`,
  with opacity modifiers like `bg-accent/90`) resolves to emerald. This is
  the new redesign's single accent, used sparingly for links, active states,
  CTAs, eyebrow numbers, hover highlights.

`background`/`foreground` CSS var values (`--background: #0a0a0f`,
`--foreground: #f5f5f7`) are left as-is — already near-black/off-white,
no change needed.

Borders use Tailwind's built-in `border-white/10` (not a new token).

### Typography

- Keep Inter (`--font-inter`) for body and headings.
- Add JetBrains Mono via `next/font/google` as `--font-mono` in
  `app/layout.tsx`, exposed as `font-mono` in Tailwind (extend
  `fontFamily.mono`).
- Mono is used for: nav links, section eyebrows (`01 — About`), project index
  numbers, tag/pill text, hero role rotation, small metadata (duration/role).

### Surfaces

- New `.surface` utility added to `globals.css` `@layer components`:
  `@apply bg-surface border border-white/10;` — no blur, no shadow, no
  gradient. Used by the redesigned components in place of `.glass`/
  `.glass-dark` (those classes remain defined for other pages, just unused
  by the new components).
- Nav scrolled state: `bg-background border-b border-white/10` instead of
  `.glass-dark` blur.

### New additions to globals.css (additive only)

- `--font-mono` fallback var added to `:root`, mirroring the existing
  `--font-inter` pattern.
- New `.surface` class (see above).
- Scrollbar thumb: change from the purple/pink/cyan gradient to solid
  `muted`, `accent` on hover. This is a shared, purely-decorative global
  change (low risk for other pages).
- `::selection`: change background color from purple-tinted to
  `accent`-tinted (`rgba(52, 211, 153, 0.3)`). Shared, decorative, low risk.
- Body `background-image` radial gradients: replace the four
  purple/cyan/pink/green 10%-opacity corner radials with a single faint
  white/grey radial (low opacity) near the top center, for subtle depth
  without color. This is a shared change — `/admin` and `/login` already
  layer their own colorful blur blobs on top, so this faint base-layer tint
  swap is low-risk there.
- `.html-content a` link color: change from cyan/purple to
  `accent`/`foreground`. Shared with `/projects/[slug]` (also renders
  `.html-content`) — cosmetic link-color-only change, low risk.

### Kept (untouched)

- `.glass`, `.glass-dark`, `.gradient-text`, `.bg-gradient-cyber`,
  `animate-float`, `animate-gradient-flow`, and the `glow`/`float`/
  `gradient-shift`/`gradient-flow` keyframes all remain in
  `globals.css`/`tailwind.config.js` exactly as they are — required by
  `/admin/*`, `/login`, `/projects/[slug]`, `ImageUpload`, `RichTextEditor`.
- `slideUp`/`slideDown`/`fadeIn` keyframes — untouched, not directly used by
  framer-motion variants but kept as-is (no removal needed since nothing is
  being deleted from the config).

## Component-by-component

### Navigation (`components/Navigation.tsx`)

- Logo: replace `Code2` icon + `gradient-text` "Sabdho.dev" with plain mono
  text `sabdho.dev` (lowercase, `font-mono`, `text-foreground`, no icon, no
  gradient).
- Nav links: `font-mono`, uppercase, `tracking-wide`, `text-sm`, `text-muted`
  default, `text-accent` when active/hover. Active indicator: simple
  `border-bottom` or static underline in `accent` (drop the animated
  gradient `layoutId` underline — replace with a plain accent underline,
  animation can stay via `layoutId` but rendered in solid accent, not
  gradient).
- Scrolled state: `bg-background/95` (or `.surface`) + `border-b
  border-white/10` instead of `.glass-dark` blur.
- Mobile menu: same flat surface treatment, no gradient highlight on active
  item — use `text-accent` + subtle `bg-white/5`.

### Hero (`components/Hero.tsx`)

- Remove the three absolutely-positioned blurred gradient blob `div`s
  entirely (and the `animate-float` usages).
- Replace the emoji greeting badge (`👋 Welcome to my portfolio`) with a
  small mono "status" line: a 2px accent dot + `font-mono text-xs uppercase
  tracking-wide text-muted` text reading `AVAILABLE FOR WORK` (or similar —
  no emoji, no glass pill required, can keep a thin-border pill if desired
  but flat, not glass).
- Heading: "Hi, I'm Sabdho" — `text-foreground font-bold`, with `Sabdho` in
  `text-accent` (solid color, no `gradient-text`).
- Rotating role text: keep the `AnimatePresence`/interval logic, restyle to
  `font-mono text-accent` (drop `text-accent-purple`).
- Description copy — replace generic paragraph with:

  > "I build cross-platform apps and web products with React Native,
  > Flutter, and Next.js — from internal business systems to client-facing
  > apps, shipped end to end."

- CTA buttons:
  - Primary ("View My Work"): solid `bg-accent text-background` (dark text
    on emerald), replaces `bg-gradient-cyber`.
  - Secondary ("Get In Touch"): `border border-white/15 text-foreground`
    outline button, replaces `.glass`.
- Social icons: `border border-white/10` square/circle buttons,
  `hover:border-accent hover:text-accent`, replaces `.glass`.
- Scroll-down arrow: `text-muted` (drop `text-accent-cyan`), keep bounce
  animation.

### About (`components/About.tsx`)

- Remove the 4-stat grid (`stats` array: Years Experience, Milestones
  Achieved, Happy Clients, Apps Published) and its icons entirely.
- Remove the "Core Technologies" pill block at the bottom (duplicates new
  Skills section).
- Section eyebrow: `font-mono text-xs uppercase tracking-widest text-accent`
  reading `01 — About`, above the heading (replaces the small gradient
  underline bar `<div className="w-20 h-1 bg-gradient-cyber ...">`).
- Heading: drop `gradient-text` on "About Me" → plain `text-foreground`,
  optionally `Me` in `text-accent`.
- Bio copy — replace the three generic paragraphs with two tighter
  paragraphs:

  > "I'm a front-end developer based in Jakarta, working across React
  > Native, Flutter, React, and Next.js. Over 4+ years I've built HR
  > systems, ERP tools, and consumer apps — covering UI architecture, API
  > integration, and deployment."
  >
  > "I care about code that's easy to read a year later, interfaces that
  > don't make people think, and shipping things that actually get used."

- Layout becomes a single-column (max-width prose block) under the eyebrow +
  heading, left-aligned — no more two-column grid with stats, since stats are
  removed. (If this leaves the section visually thin, allow a secondary
  column listing 3–4 short "currently" facts as plain text — implementer's
  call, kept minimal.)

### Skills (`components/Skills.tsx`)

- Section eyebrow: `02 — Skills`, same treatment as About.
- Drop `gradient-text` on heading, drop the gradient underline bar.
- Remove per-category gradient icon boxes, percentage numbers, and the
  animated progress bar fill (`motion.div` width animation + `level` field
  use).
- New layout: for each category, render category title as
  `font-mono text-xs uppercase tracking-widest text-muted` header, then a
  `flex flex-wrap gap-2` of skill names as `.surface`-style pills
  (`border border-white/10 rounded-md px-3 py-1.5 text-sm text-foreground`).
  Category `icon`/`color`/`level` fields in the data array become unused —
  keep `name` per skill, drop `level`; category keeps `title` + `skills`
  (icon/color removed from the data array).
- Keep the closing line ("Always learning...") restyled in `text-muted`.

### Projects (`components/Projects.tsx`)

- Section eyebrow: `03 — Projects`, same treatment.
- Drop `gradient-text` heading treatment + gradient underline bar.
- Card container: `.surface rounded-lg overflow-hidden` (drop `.glass`),
  hover: `border-accent/40` + small `translateY` lift (keep framer
  `whileHover={{ y: -4 }}`, reduce from `-10`).
- Card header (replaces the emoji-on-gradient block): a `.surface`-bordered
  header strip showing the project's index number as large `font-mono
  text-accent` (`01`, `02`, zero-padded), e.g. `text-4xl font-mono
  text-accent/60`. `project.image` and `project.gradient` fields are no
  longer read here.
- Status badge (non-"completed" projects): plain `font-mono text-xs
  uppercase text-muted border border-white/10 rounded px-2 py-0.5`, no
  `bg-black/50 backdrop-blur`.
- Duration/role line: drop `⏱️`/`👤` emoji — render as plain
  `font-mono text-xs text-muted`, e.g. `Duration: {duration}` and
  `Role: {role}` separated by `·`.
- Tags: `.surface`-style bordered pills, `text-muted` (drop
  `text-accent-cyan`).
- Empty state: drop `📂` emoji — plain centered text, `text-muted`.
- Loading skeleton: keep structure, swap `bg-white/5` skeleton blocks to use
  `surface`/`border-white/10` tones (cosmetic, low priority).

### Contact (`components/Contact.tsx`)

- Section eyebrow: `04 — Contact`, same treatment; drop `gradient-text` +
  gradient underline bar.
- Contact method cards: `.surface` cards (drop `.glass`), icon container
  loses per-item gradient (`bg-gradient-to-br ${method.color}`) → plain
  `border border-white/10 rounded-lg p-4` with icon in `text-accent`.
- CTA panel: `.surface rounded-2xl` (drop `.glass`), remove the two
  absolutely-positioned blurred gradient blobs.
- Heading "Let's Build Something Amazing Together": drop `gradient-text` on
  "Amazing" → `text-accent`.
- Email CTA button: same primary style as Hero ("View My Work") —
  `bg-accent text-background`.
- Social link buttons: `border border-white/10` icon buttons,
  `hover:border-accent hover:text-accent` (drop per-icon hover color
  variants `hover:text-accent-purple` etc.).
- Footer: name "Sabdho Cathur Kuncoro" in `text-accent` (drop
  `text-accent-cyan`), rest unchanged.

### WhatsApp FAB (`components/WhatsAppFab.tsx`)

- Remove the pulsing ring `motion.div` (infinite scale/opacity loop) and the
  gradient + glow shadow (`bg-gradient-to-br from-green-400 to-green-600
  shadow-lg shadow-green-500/50`).
- Replace with a flat circle: `bg-[#25D366]` (WhatsApp brand green, distinct
  from the emerald accent — acceptable as a brand-recognition exception) or
  `bg-accent` if a single-accent-everywhere look is preferred (implementer's
  call; WhatsApp green is recommended for recognizability).
- `border border-white/10`, simple CSS/framer hover scale (`whileHover={{
  scale: 1.08 }}`), no infinite animations.
- Tooltip: keep, restyle to `.surface` instead of `bg-gray-900`.

## Animation policy summary

Keep:
- Scroll-reveal fade + slide-up on section/card entrance (existing
  `initial`/`animate`/`isInView` pattern) — unchanged timing.
- Small hover lifts on cards (`whileHover={{ y: -4 }}`, reduced from `-10`).
- Hero rotating role text (`AnimatePresence`).
- Nav active-section indicator animation (`layoutId`), restyled to solid
  accent.
- WhatsApp FAB entrance spring + hover scale.

No longer used by the redesigned components (kept in config/globals.css for
other pages, see "Token strategy" above):
- Floating blur blobs (Hero background, Contact CTA panel) — markup deleted.
- `animate-float`, `animate-gradient-flow`, `glow` keyframes/utilities —
  config entries kept, just not referenced by new component markup.
- `gradient-text` background-position animation — class kept, unused here.
- Skills progress-bar width animation — bars removed from `Skills.tsx`
  entirely.
- WhatsApp FAB pulsing ring loop — markup deleted.

## Open implementation notes

- `tailwind.config.js` has a typo key `'gradient-cy ber'` (with a space) in
  `backgroundImage` — this block is kept as-is for other pages (not part of
  this redesign's scope); the typo is pre-existing and out of scope, leave
  it alone.
- Skills data array currently includes `icon` and `color` per category and
  `level` per skill — these fields become unused and should be removed from
  the array literal in `Skills.tsx` (not just unrendered), since nothing else
  reads `data` from this file.
