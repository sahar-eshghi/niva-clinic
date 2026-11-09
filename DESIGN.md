# NIVA Design Direction

## Reading the brief
Luxury aesthetic-clinic landing page for clients who value natural-looking beauty, thoughtful consultation and personal care. Quiet luxury meets European editorial art direction.

## Design settings
- Design variance: 8/10. Asymmetric compositions, offset image frames and changing section rhythms instead of uniform card grids.
- Motion intensity: 4/10. Slow reveals, image hover transitions and restrained parallax with reduced-motion support.
- Visual density: 3/10. Large whitespace, short copy blocks and an editorial treatment list.
- System: native HTML/CSS/JS. Luxury editorial and web glassmorphism are aesthetic directions rather than a branded component library.

## Tokens
- Warm ivory: `#FFF7F4`
- Porcelain / soft pink: `#F5E3E4`
- Champagne gold: `#C6A15A`
- Vivid burgundy: `#8E1638`
- Espresso brown: `#633A3C`
- Rose pink: `#D8879D`
- Persian body: Estedad with system fallback
- Latin/body: DM Sans
- Editorial serif: Playfair Display

## Layout language
- Split, asymmetric hero and large portrait photography.
- Open text and a ruled list for treatments instead of repetitive boxed cards.
- Overlapping clinic-atmosphere imagery, large image-to-copy blocks, editorial journal composition, staggered gallery.
- Glass effect is reserved for a small number of floating details and the sticky navigation, not applied to every panel.

## Interaction rules
- Sticky header with working mobile navigation.
- Persian RTL default and functional FA/EN language toggle.
- Keyboard focus states, skip link, form labels and inline validation.
- Scroll reveal and parallax stop/soften for `prefers-reduced-motion`.
- Booking form is deliberately a demo and never claims that data was sent or saved.

## Content truth
No clinic address, provider credentials, testimonial, guarantee or treatment outcome is invented. Placeholder copy should be replaced only with verified and approved information.


## Categories section
Full-bleed three-column cinematic video categories on desktop, stacked on mobile. Palette uses deep burgundy and high-contrast champagne outlines, one-shot IntersectionObserver reveal (threshold 0.1), staggered card opacity/translation, and a reduced-motion fallback. Video sources use supplied HTTPS URLs; all project-owned files use relative paths for GitHub Pages.


## NIVA clinic theme (current)
Warm ivory ground with vivid burgundy, rose pink, espresso brown and restrained champagne-gold accents. Hero content is lifted slightly by reducing top padding and the gap under the headline. Main service areas: aesthetic surgery/procedures, laser, rejuvenation and body contouring. The visual-story section is labelled as the portfolio and uses explicit placeholder captions until real, consented clinic imagery is supplied. Headings: Amiri. Body/UI: Vazirmatn. Motion unchanged; hover effects gated to pointer devices.
