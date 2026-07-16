/**
 * Fonts, self-hosted via @fontsource.
 *
 * These packages bundle the actual .woff2 files inside node_modules and
 * Vite copies them into the production build, so the site never makes a
 * network request to fonts.googleapis.com (or anywhere else) to render
 * text. This is what makes the whole app runnable with zero internet
 * access once `npm install` has completed once.
 *
 * Each face ships many unicode-range subsets (latin, latin-ext, cyrillic,
 * greek, vietnamese...). We only import the `latin` subset for the Latin
 * faces and `latin` + `arabic` for the Arabic faces, since that is all
 * this site's content actually uses - importing the umbrella "400.css"
 * per weight would pull in every subset and roughly double the font
 * payload for scripts the site never renders.
 */

// Space Grotesk - display/heading face (Latin)
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";

// IBM Plex Sans - body face (Latin)
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-sans/latin-700.css";

// IBM Plex Mono - data/technical face (control IDs, audit log lines)
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";

// Cairo - Arabic display face, pairs with Space Grotesk's geometric feel
import "@fontsource/cairo/latin-400.css";
import "@fontsource/cairo/latin-500.css";
import "@fontsource/cairo/latin-600.css";
import "@fontsource/cairo/latin-700.css";
import "@fontsource/cairo/arabic-400.css";
import "@fontsource/cairo/arabic-500.css";
import "@fontsource/cairo/arabic-600.css";
import "@fontsource/cairo/arabic-700.css";

// Tajawal - Arabic body face, designed for long-form reading like Plex Sans
import "@fontsource/tajawal/latin-400.css";
import "@fontsource/tajawal/latin-500.css";
import "@fontsource/tajawal/latin-700.css";
import "@fontsource/tajawal/arabic-400.css";
import "@fontsource/tajawal/arabic-500.css";
import "@fontsource/tajawal/arabic-700.css";
