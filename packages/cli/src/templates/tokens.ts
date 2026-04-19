export const VAYU_TOKENS_CSS = `@custom-variant dark (&:where(.dark, .dark *));

:root {
  /* ═══ BASE LAYERS ═══ */
  --canvas: #f4f4f5;
  --canvas-content: #09090b;
  --surface: #fff;
  --surface-content: #09090b;
  --sidebar: #fafafa;
  --sidebar-content: #18181b;
  --elevated: #fff;
  --elevated-content: #09090b;

  /* ═══ SEMANTIC COLORS ═══ */
  --brand: #84cc16;
  --brand-content: #052e16;
  --success: #10b981; --success-content: #fff;
  --warning: #f59e0b; --warning-content: #fff;
  --destructive: #ef4444; --destructive-content: #fff;
  --info: #0ea5e9; --info-content: #fff;
  --muted: #e4e4e7;
  --muted-content: #71717a;

  /* ═══ STRUCTURAL ═══ */
  --border: #d4d4d8;
  --field: #a1a1aa;
  --focus: #84cc16;
  --shadow: #000;
}

:root.dark {
  --canvas: #000;
  --canvas-content: #fafafa;
  --surface: #0a0a0a;
  --surface-content: #fff;
  --sidebar: #121212;
  --sidebar-content: #e4e4e7;
  --elevated: #1a1a1a;
  --elevated-content: #fff;

  --brand: #bef264;
  --brand-content: #000;
  --success: #34d399; --success-content: #000;
  --warning: #facc15; --warning-content: #000;
  --destructive: #f87171; --destructive-content: #000;
  --info: #38bdf8; --info-content: #000;
  --muted: #27272a;
  --muted-content: #a1a1aa;

  --border: #27272a;
  --field: #3f3f46;
  --focus: #bef264;
  --shadow: #fff;
}

@theme {
  /* ── Base Layers ── */
  --color-canvas: var(--canvas);
  --color-canvas-content: var(--canvas-content);
  --color-surface: var(--surface);
  --color-surface-content: var(--surface-content);
  --color-sidebar: var(--sidebar);
  --color-sidebar-content: var(--sidebar-content);
  --color-elevated: var(--elevated);
  --color-elevated-content: var(--elevated-content);

  /* ── Semantic Colors ── */
  --color-brand: var(--brand);
  --color-brand-content: var(--brand-content);
  --color-success: var(--success);
  --color-success-content: var(--success-content);
  --color-warning: var(--warning);
  --color-warning-content: var(--warning-content);
  --color-destructive: var(--destructive);
  --color-destructive-content: var(--destructive-content);
  --color-info: var(--info);
  --color-info-content: var(--info-content);
  --color-muted: var(--muted);
  --color-muted-content: var(--muted-content);

  /* ── Structural ── */
  --color-border: var(--border);
  --color-field: var(--field);
  --color-focus: var(--focus);

  /* ── Radius ── */
  --radius: 6px;
  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 2px);
  --radius-control: var(--radius-sm);
  --radius-surface: var(--radius-md);
  --radius-overlay: var(--radius-lg);
  --radius-full: 9999px;

  /* ── Shadows ── */
  --shadow-color: var(--shadow);
  --shadow-sm: 0 1px 2px rgb(var(--shadow-color) / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(var(--shadow-color) / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(var(--shadow-color) / 0.1);
  --shadow-control: var(--shadow-sm);
  --shadow-surface: var(--shadow-sm);
  --shadow-elevated: var(--shadow-md);
  --shadow-focus: var(--shadow-lg);
  --shadow-inner: inset 0 2px 4px rgb(var(--shadow-color) / 0.1);
  --drop-shadow-subtle: 0 1px 2px rgb(0 0 0 / 0.12);
  --drop-shadow-elevated: 0 4px 6px rgb(0 0 0 / 0.18);

  /* ── Text Shadows ── */
  --text-shadow: 0px 1px 2px rgb(0 0 0 / 0.2);
  --text-shadow-sm: 0px 1px 1px rgb(0 0 0 / 0.15);
  --text-shadow-md: var(--text-shadow);
  --text-shadow-lg: 0px 2px 4px rgb(0 0 0 / 0.25);
  --text-shadow-subtle: var(--text-shadow-sm);
  --text-shadow-surface: var(--text-shadow-md);
  --text-shadow-overlay: var(--text-shadow-lg);

  /* ── Blur ── */
  --blur: 12px;
  --blur-sm: calc(var(--blur) - 4px);
  --blur-md: var(--blur);
  --blur-lg: calc(var(--blur) + 8px);
  --blur-control: var(--blur-sm);
  --blur-surface: var(--blur-md);
  --blur-overlay: var(--blur-lg);

  /* ── Fonts ── */
  --font-primary: "Oswald", sans-serif;
  --font-secondary: "Mulish", sans-serif;
  --font-tertiary: "Geist Mono", monospace;

  /* ── Font Sizes ── */
  --font-size: 1rem;
  --text-xs: calc(var(--font-size) * 0.75);
  --text-sm: calc(var(--font-size) * 0.875);
  --text-md: var(--font-size);
  --text-lg: calc(var(--font-size) * 1.125);
  --text-xl: calc(var(--font-size) * 1.25);
  --text-2xl: calc(var(--font-size) * 1.5);
  --text-3xl: calc(var(--font-size) * 1.875);
  --text-h1: var(--text-3xl);
  --text-h2: var(--text-2xl);
  --text-h3: var(--text-xl);
  --text-h4: var(--text-lg);
  --text-h5: var(--text-md);
  --text-h6: var(--text-sm);
  --text-para: var(--text-sm);

  /* ── Transitions ── */
  --transition-fast: 150ms ease-in-out;
  --transition-medium: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;

  /* ── Animations ── */
  --animate-marquee-scroll: marquee-scroll linear infinite;
  --animate-marquee-ping-pong: marquee-ping-pong linear infinite alternate;
  --animate-fade-in: fade-in 1s ease-out;
  --animate-float: float 6s ease-in-out infinite;
  --animate-float-particle: float-particle 15s linear infinite;
  --animate-morph-blob: morph-blob 20s ease-in-out infinite;
  --animate-orbit: orbit 20s linear infinite;
  --animate-slide-in-left: slide-in-left 1s both;
  --animate-slide-in-right: slide-in-right 1s both;
  --animate-slide-in-up: slide-in-up 1s both;
  --animate-slide-in-down: slide-in-down 1s both;
  --animate-bounce-in: bounce-in 1s ease;
  --animate-bounce-in-small: bounce-in-small 1s ease;
  --animate-bounce-in-large: bounce-in-large 1s ease;
  --animate-flip-in-x: flip-in-x 1s ease-in;
  --animate-flip-in-y: flip-in-y 1s ease-in;
  --animate-rotate-in: rotate-in 1s ease-out;
  --animate-zoom-in: zoom-in 1s ease-out;
  --animate-zoom-in-small: zoom-in-small 1s ease-out;
  --animate-zoom-in-large: zoom-in-large 1s ease-out;
  --animate-roll-in: roll-in 1s ease-out;
  --animate-roll-in-right: roll-in-right 1s ease-out;
  --animate-roll-in-up: roll-in-up 1s ease-out;
  --animate-roll-in-down: roll-in-down 1s ease-out;
  --animate-jack-in-the-box: jack-in-the-box 1s ease-out;
  --animate-hinge: hinge 2s ease-in-out;
  --animate-spin-slow: spin-slow 60s linear infinite;
  --animate-reverse-spin: reverse-spin 40s linear infinite;
  --animate-toast-enter: toast-enter 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
  --animate-toast-exit: toast-exit 300ms ease-in both;
  --animate-toast-enter-left: toast-enter-left 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
  --animate-toast-exit-left: toast-exit-left 300ms ease-in both;
  --animate-toast-enter-top: toast-enter-top 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
  --animate-toast-exit-top: toast-exit-top 300ms ease-in both;
  --animate-toast-enter-bottom: toast-enter-bottom 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
  --animate-toast-exit-bottom: toast-exit-bottom 300ms ease-in both;
}

/* ── Keyframes ── */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes marquee-scroll {
  0%   { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-ping-pong {
  0%   { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-20px); }
}

@keyframes float-particle {
  0%        { opacity: 0; }
  10%, 90%  { opacity: 1; }
  100%      { opacity: 0; transform: translateY(-100vh) translateX(20px); }
}

@keyframes orbit {
  from { transform: rotate(0); }
  to   { transform: rotate(360deg); }
}

@keyframes morph-blob {
  0%, 100% { transform: scale(1); }
  33%      { transform: scale(1.1); }
  66%      { transform: scale(0.8); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slide-in-left {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes slide-in-right {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes slide-in-up {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes slide-in-down {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes bounce-in {
  0%   { opacity: 0; transform: scale(.3); }
  60%  { opacity: 1; transform: scale(1.03); }
  100% { transform: scale(1); }
}

@keyframes bounce-in-small {
  0%   { opacity: 0; transform: scale(.5); }
  60%  { opacity: 1; transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes bounce-in-large {
  0%   { opacity: 0; transform: scale(.1); }
  50%  { opacity: 1; transform: scale(1.08); }
  70%  { transform: scale(.95); }
  100% { transform: scale(1); }
}

@keyframes flip-in-x {
  from { transform: rotateX(90deg); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes flip-in-y {
  from { transform: rotateY(90deg); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes rotate-in {
  from { transform: rotate(-200deg); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes zoom-in-small {
  from { transform: scale(.7); opacity: 0; }
  to   { opacity: 1; }
}

@keyframes zoom-in {
  from { transform: scale(.3); opacity: 0; }
  to   { opacity: 1; }
}

@keyframes zoom-in-large {
  from { transform: scale(.1); opacity: 0; }
  to   { opacity: 1; }
}

@keyframes roll-in {
  from { transform: translateX(-100%) rotate(-120deg); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes roll-in-right {
  from { transform: translateX(100%) rotate(120deg); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes roll-in-up {
  from { transform: translateY(100%) rotate(120deg); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes roll-in-down {
  from { transform: translateY(-100%) rotate(-120deg); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

@keyframes jack-in-the-box {
  from { opacity: 0; transform: scale(.1) rotate(30deg); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes hinge {
  to { transform: translateY(700px); opacity: 0; }
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

@keyframes reverse-spin {
  to { transform: rotate(0); }
}

@keyframes toast-enter {
  from { opacity: 0; transform: translateX(100%); }
  to   { opacity: 1; transform: none; }
}

@keyframes toast-exit {
  from { opacity: 1; }
  to   { opacity: 0; transform: translateX(100%); }
}

@keyframes toast-enter-left {
  from { opacity: 0; transform: translateX(-100%); }
  to   { opacity: 1; transform: none; }
}

@keyframes toast-exit-left {
  from { opacity: 1; }
  to   { opacity: 0; transform: translateX(-100%); }
}

@keyframes toast-enter-top {
  from { opacity: 0; transform: translateY(-100%); }
  to   { opacity: 1; transform: none; }
}

@keyframes toast-exit-top {
  from { opacity: 1; }
  to   { opacity: 0; transform: translateY(-100%); }
}

@keyframes toast-enter-bottom {
  from { opacity: 0; transform: translateY(100%); }
  to   { opacity: 1; transform: none; }
}

@keyframes toast-exit-bottom {
  from { opacity: 1; }
  to   { opacity: 0; transform: translateY(100%); }
}

/* ── Button Group Styles ── */
[role="group"][class*="flex-row"]>button:not(:first-child):not(:last-child) {
  border-radius: 0;
  border-left-width: 0;
}

[role="group"][class*="flex-row"]>button:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

[role="group"][class*="flex-row"]>button:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: 0;
}

[role="group"][class*="flex-col"]>button:not(:first-child):not(:last-child) {
  border-radius: 0;
  border-top-width: 0;
}

[role="group"][class*="flex-col"]>button:first-child {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

[role="group"][class*="flex-col"]>button:last-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top-width: 0;
}

/* ── Accessibility ── */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
  }
}
`;

export const TOKENS_START_MARKER = '/* Vayu UI Tokens - Start */';
export const TOKENS_END_MARKER = '/* Vayu UI Tokens - End */';
