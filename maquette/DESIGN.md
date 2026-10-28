---
name: Luminous Street Kitchen
colors:
  surface: '#f8f9ff'
  surface-dim: '#d1dbec'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dfe9fa'
  surface-container-highest: '#d9e3f4'
  on-surface: '#121c28'
  on-surface-variant: '#5b4039'
  inverse-surface: '#27313e'
  inverse-on-surface: '#eaf1ff'
  outline: '#907067'
  outline-variant: '#e4beb4'
  surface-tint: '#b02f00'
  primary: '#b02f00'
  on-primary: '#ffffff'
  primary-container: '#ff5722'
  on-primary-container: '#541200'
  inverse-primary: '#ffb5a0'
  secondary: '#575e70'
  on-secondary: '#ffffff'
  secondary-container: '#d9dff5'
  on-secondary-container: '#5c6274'
  tertiary: '#9d4300'
  on-tertiary: '#ffffff'
  tertiary-container: '#ec6a07'
  on-tertiary-container: '#4a1c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb5a0'
  on-primary-fixed: '#3b0900'
  on-primary-fixed-variant: '#862200'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#783200'
  background: '#f8f9ff'
  on-background: '#121c28'
  surface-variant: '#d9e3f4'
typography:
  display-hero:
    fontFamily: Bricolage Grotesque
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
  display-hero-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-xl:
    fontFamily: Bricolage Grotesque
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  price-display:
    fontFamily: Bricolage Grotesque
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses the vibrant, kinetic atmosphere of contemporary culinary culture paired with an ultra-clean, daylight-bright ordering experience. The tone is appetizing, direct, and unpretentious yet refined.

The style synthesizes high-personality headline typography with radical layout clarity:
- **Palette atmosphere:** Sunlit white canvases accented by intense, appetizing citrus-chili warmth.
- **Graphic presence:** Expressive, organic headline letterforms that evoke market signage and hand-crafted culinary flair, disciplined by crisp modernist body typesetting.
- **Spatial balance:** Ample negative space that prevents visual fatigue during fast-paced decision making, using soft ambient transitions instead of heavy outlines.

## Colors

The color system is optimized for high-speed culinary navigation, using clear luminance hierarchies to direct visual focus.

- **Primary (`#FF5722`):** Flame Persimmon. Used exclusively for primary transactional actions, direct calls-to-action, cart confirmations, and active focus boundaries.
- **Secondary (`#111827`):** Ink Charcoal. Supplies contrast for display headings, product names, price tags, and primary iconography.
- **Tertiary (`#F97316`):** Warm Saffron Orange. Used for secondary status accents, recommendation badges, active dietary tags, and rating indicators.
- **Neutral (`#4B5563`):** Slate Gray. Provides calibrated readability for descriptive text, nutritional details, subtext, and inactive metadata.
- **Canvas & Surfaces:**
  - Base background: `#FFFFFF`
  - Secondary card & section container: `#F9FAFB`
  - Interactive chip & input background: `#F3F4F6`
  - Subdued boundary divider: `#E5E7EB`

## Typography

The typographical pairing sets up a deliberate contrast:
- **Display & Section Titles:** Set in `Bricolage Grotesque`. Its variable eccentricities and tactile ink-trap aesthetic evoke authentic culinary warmth without feeling rustic or chaotic.
- **Body, Inputs & Microcopy:** Set in `Hanken Grotesk`. Geometric, neutral, and crisp, ensuring nutritional info, dish descriptions, and pricing calculations remain immediately scannable under direct light.
- **Tabular Figures:** Price tags use proportional figures within `Bricolage Grotesque` to pair bold character with legible monetary alignment.

## Layout & Spacing

The layout is built upon an adaptive 12-column fluid grid on desktop and tablet, collapsing to a 4-column structure on mobile devices.

- **Breakpoints:**
  - Mobile: `< 640px` (4 columns, `margin-sm: 1rem`, `gutter-sm: 1rem`)
  - Tablet: `640px – 1024px` (8 columns, `margin: 1.5rem`, `gutter: 1.25rem`)
  - Desktop: `> 1024px` (12 columns, max container width `1280px`, `margin: 2rem`, `gutter: 1.5rem`)
- **Spacing Rhythm:**
  - Food item cards leverage `space-lg` internal padding to prevent cramped item imagery.
  - Category filter strips use horizontal swipe zones with `space-sm` gaps on mobile, expanding to `space-md` wrapped grids on larger viewports.
  - Sticky checkout triggers hover over the bottom viewport with a persistent `space-md` safe-area standoff.

## Elevation & Depth

Depth is established strictly through ambient, warm-tinted light drops and alternating surface values, avoiding heavy borders or opaque backdrops.

- **Surface Levels:**
  - `Level 0 (Canvas)`: Flat `#FFFFFF` canvas.
  - `Level 1 (Card Recess)`: Background `#F9FAFB` with no shadow; used to group contextual sections.
  - `Level 2 (Active Cards)`: White `#FFFFFF` surface lifted by `0px 4px 20px -2px rgba(17, 24, 39, 0.04), 0px 2px 6px -1px rgba(17, 24, 39, 0.02)`.
  - `Level 3 (Floating Bar / Cart Modal)`: White `#FFFFFF` lifted by `0px 16px 32px -4px rgba(255, 87, 34, 0.08), 0px 6px 12px -2px rgba(17, 24, 39, 0.05)`.
- **Ghost Borders:** Where structural separation is mandatory, apply a single hairline stroke using `#F3F4F6` or `#E5E7EB` with 60% opacity.

## Shapes

The geometric architecture pairs a base radius of `0.5rem` (`8px`) for compact operational components with amplified corner treatments for primary spatial elements:

- **Base Radius (`0.5rem`):** Applied to form fields, quantity steppers, dietary tags, and table cells.
- **Card Radius (`1rem`):** Applied to menu item cards, order recap panes, and secondary modals.
- **Hero & Modal Radius (`1.5rem`):** Applied to promotional banners, bottom sheets, and dish customization drawers.
- **Full Pill (`9999px`):** Reserved for category filter pills, floating cart notifications, and standalone badge icons.

## Components

### Buttons
- **Primary Action (Add to Cart, Checkout):** Solid `#FF5722` fill, white `#FFFFFF` label, subtle ambient orange shadow. Transitions on press to scale `0.98` with `#E64A19`.
- **Secondary Action:** `#F3F4F6` surface, `#111827` label. Zero border. Hover shifts to `#E5E7EB`.
- **Ghost / Destructive:** Transparent background, `#4B5563` text, turning to `#DC2626` text on warning triggers.

### Chips & Filter Pills
- **Inactive:** `#F9FAFB` surface with `#4B5563` label, no border.
- **Active:** Solid `#FF5722` background with `#FFFFFF` label in bold weight.
- **Dietary Icons:** Compact pill containers with a faint tint (e.g., `#FF5722` at 10% opacity) and saturated accent glyphs.

### Cards (Menu Items)
- **Structure:** Clean `#FFFFFF` base wrapped inside `Level 2` elevation or `#F9FAFB` recessed shell.
- **Media:** Aspect ratio `4:3` with corner rounding matching the card's inner radius.
- **Layout:** Bold `Bricolage Grotesque` item name at the top, concise `Hanken Grotesk` description beneath, and price pinned at bottom-left opposing an ambient circular `+` button.

### Form Inputs & Customization Steppers
- **Text Fields:** `#F9FAFB` background, `0.5rem` rounded corners, `#111827` active typing text, and a `#FF5722` focus ring.
- **Quantity Stepper:** Pill shape (`9999px`), light gray background `#F3F4F6`, featuring charcoal minus/plus icons surrounding an ink-charcoal figure counter.

### Checkboxes & Radios
- **Unchecked:** `#E5E7EB` circular or rounded-square boundary on pure white.
- **Checked:** Solid `#FF5722` fill with a crisp white checkmark or inner dot. No harsh box-shadows.

### Floating Cart Bar
- Fixed persistent strip anchored to the bottom screen edge.
- Pure `#FFFFFF` surface with an elevated `Level 3` orange-tinted drop shadow, pill shape, housing item quantity badges, total calculated cost in `price-display`, and a primary checkout button.