---
name: HI-Tech Solutions
description: Pragmatic digitalization for German mid-sized manufacturing.
colors:
  factory-white: "#FFFFFF"
  operations-surface: "#F6F8FA"
  operations-surface-light: "#F8FAFC"
  graphite: "#2B323A"
  steel: "#6F7780"
  signal-cyan: "#3EBAEC"
  system-indigo: "#6366F1"
  machine-green: "#10B981"
  divider: "#E4E8EC"
typography:
  display:
    fontFamily: "Exo 2, sans-serif"
    fontSize: "clamp(34px, 4.5vw, 58px)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.01em"
rounded:
  choice: "12px"
  card: "14px"
  panel: "20px"
  pill: "999px"
spacing:
  compact: "12px"
  control: "16px"
  card: "36px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.signal-cyan}"
    textColor: "{colors.factory-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
  button-secondary:
    backgroundColor: "{colors.factory-white}"
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  quick-check-choice:
    backgroundColor: "{colors.factory-white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.choice}"
    padding: "14px 16px"
---

# Design System: HI-Tech Solutions

## Overview

**Creative North Star: "The Operating Floor Console"**

This system should feel like a clean, dependable control surface for a real production environment: factual, legible, and technically capable without posing as enterprise software. The visual language pairs cool, lightly structured surfaces with dashboard imagery and concise signals. It communicates the promise in PRODUCT.md: software *"die im Werk wirklich funktioniert."*

The site uses spacious, ordered sections to make a complex manufacturing topic understandable. Cyan marks action and live system state; indigo is a secondary system signal. Real dashboard previews, integration flows, and Quick Check controls carry the technical proof. The aesthetic must not drift toward a corporate Siemens/SAP deck, generic SaaS cream, or an abstract consulting site.

**Key Characteristics:**

- Cool, high-clarity surfaces with restrained borders and concise shadows.
- Exo 2 creates an engineered display voice; Inter keeps dense operational copy readable.
- Pill actions and compact status signals introduce tactility without decorative excess.
- Dashboard and shop-floor product imagery are evidence, not ornament.

## Colors

The palette is an operational readout: near-white surfaces preserve clarity, graphite carries information, and cyan identifies action or a live signal.

### Primary

- **Signal Cyan:** The primary action, focus, active navigation, and live-status color. Use it for the decisive action on a view and for states that require attention.
- **System Indigo:** A secondary technical signal used with cyan in the established progress and primary-action gradients; it is not a replacement for cyan as the default interactive color.
- **Machine Green:** Reserved for healthy, successful, or live machine-status indicators. Always pair it with a label or icon.

### Neutral

- **Factory White:** The clean component and trust-strip surface.
- **Operations Surface:** The default page and panel ground, kept cool rather than warm.
- **Operations Surface Light:** A slightly brighter neutral for nested summaries and hero surfaces.
- **Graphite:** Default reading color and dark footer ground.
- **Steel:** Supporting prose and secondary navigation color.
- **Divider:** Structural separation for panels, cards, and sections.

**The Signal-Only Rule.** Cyan communicates an action, active state, or system signal. Do not use it as general decoration or scatter it evenly across a screen.

## Typography

**Display Font:** Exo 2, with the system sans-serif fallback.

**Body Font:** Inter, with the system sans-serif fallback.

**Character:** Exo 2 is precise and engineered, with enough character for decisive German headline copy. Inter is neutral and compact for production terminology, controls, and explanatory text.

### Hierarchy

- **Display** (800, `clamp(34px, 4.5vw, 58px)`, 1.06): hero statements and the main high-confidence messages.
- **Headline** (800, `clamp(26px, 3.2vw, 42px)`, 1.1): section-level arguments and key capability statements.
- **Title** (700–800, 18–28px, 1–1.3): cards, Quick Check questions, and local feature headings.
- **Body** (400, 15px, 1.65): standard explanatory content. Keep long reading measures near 65–75ch; the hero lead is capped at 520px.
- **Label** (600–700, 9–13px, 0.01–0.13em): navigation, states, metadata, and short utility labels. Uppercase is only for compact state labels and not for body copy.

**The Floor-Readable Rule.** Type must remain direct and comfortably scannable. Headline tracking never becomes tighter than the existing `-0.04em` floor; muted labels never carry essential meaning alone.

## Elevation

The system is flat by default, using white-on-cool-surface layering, thin dividers, and compact shadows to separate interactive or informational modules. Depth is structural: it clarifies cards, dashboards, and action states rather than making generic floating surfaces.

### Shadow Vocabulary

- **Resting card** (`0 2px 8px rgba(43, 50, 58, 0.04)`): subtle separation for small informational cards.
- **Panel** (`0 4px 16px rgba(43, 50, 58, 0.05)`): Quick Check and architecture containers.
- **Action lift** (`0 8px 24px rgba(62, 186, 236, 0.28)`): cyan-primary actions only; deepen on hover as already implemented.
- **Dashboard frame** (`0 20px 48px rgba(43, 50, 58, 0.1), 0 4px 12px rgba(43, 50, 58, 0.06)`): hero product imagery, where a more substantial frame earns its weight.

**The Structural Depth Rule.** Never add a wide soft shadow to an element that already has a decorative border. Choose the existing panel treatment or the existing action lift; do not create ghost cards.

## Components

### Buttons

- **Character:** Compact, direct controls built for a clear next step.
- **Primary:** The established primary CTA uses a cyan-to-indigo gradient, white Exo 2 label text, pill corners (999px), and `13px 26px` padding. Hover lifts 2px and strengthens the existing shadow.
- **Secondary:** White, graphite text, `1.5px` divider stroke, pill corners, and `12px 22px` padding. Hover changes the stroke and text to cyan and adds only a light cyan wash.
- **Focus:** Preserve a visible, high-contrast focus treatment whenever buttons are extended. Do not rely on hover alone.

### Cards / Containers

- **Corner Style:** Choices use 12px; informational cards use 14px; main panels use 20px. Do not exceed the existing 24px contact-panel radius.
- **Background:** Factory White over Operations Surface, with Divider borders.
- **Internal Padding:** Compact cards use `22px 18px`; feature panels use `36px`; the contact panel uses `56px`.
- **State:** Featured or selected cards use cyan borders and a restrained cyan-tinted background. Their distinction is semantic, not decorative.

### Quick Check

- **Style:** A white 20px-radius panel with a three-step progress indicator, selection controls, and explicit back/next actions.
- **Choices:** 12px-radius, minimum 58px-high targets. Hover and selected states use cyan borders; selected choices add a one-pixel cyan inset and a small structural shadow.
- **Status:** The active progress dot is cyan with white text. Completed and healthy state colors must always be supported by copy or an icon.

### Navigation

- **Style:** Sticky white header with a 1px Divider base and a high-transparency backdrop blur. Navigation labels are 13px Inter semibold in Steel.
- **State:** Hover uses Graphite; active uses Signal Cyan with a bolder weight. The header CTA follows the secondary-button pattern until hover.
- **Mobile:** The compact toggle replaces the horizontal links. Preserve its `aria-expanded` behavior and the existing close-on-link/outside-click behavior.

### Dashboard Preview

- **Style:** Real production-dashboard imagery presented in a lightly framed 18px-radius surface, with specific floating operational status cards.
- **Behavior:** Keep the dashboard legible at narrow widths; decorative float cards may be simplified before the image or primary CTA is compromised.

## Do's and Don'ts

### Do:

- **Do** use the cool Operations Surface and Factory White layering to keep dense manufacturing information calm and readable.
- **Do** use Signal Cyan for active system state, an explicit action, or a selected control; reserve Machine Green for labelled success or live status.
- **Do** use real dashboard, shop-floor, integration, or founder imagery as proof. The site should show production reality rather than describe it abstractly.
- **Do** preserve `prefers-reduced-motion` alternatives for reveal, floating, pulse, and scrolling-logo effects.
- **Do** use meaningful sequences only where order is information, such as the Quick Check steps or an actual project flow.

### Don't:

- **Don't** make the site feel like **SAP / Siemens / Bosch**: no distant corporate-deck polish, generic enterprise ornament, or impersonal scale signalling.
- **Don't** use **Generic SaaS cream**: no warm near-white body ground, repeated rounded icon-heading-text card grids, or tiny tracked eyebrows above every section.
- **Don't** use **Consulting-speak websites**: no abstract diagrams without production evidence, handshake photography, or copy about “transformation”, “synergy”, or an “end-to-end digital journey.”
- **Don't** use **Numbered section eyebrows (01 / 02 / 03)** as site-wide scaffolding. Numbers belong only to a genuine ordered flow.
- **Don't** add side-stripe card borders, gradient text, decorative glassmorphism, 32px-plus card radii, or arbitrary z-index values.
- **Don't** hide content behind animation. Content must remain visible when reduced motion is enabled or observers do not run.
