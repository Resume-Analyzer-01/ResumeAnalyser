# Resume Analyzer Frontend — TODO

## Step 1 — Theme system consistency
- Audit ThemeProvider + theme toggle usage across Navbar, pages, and components.
- Ensure `dark:` classes cover all interactive + card-like surfaces.
- Verify Inter font loading and color palette mapping (primary/secondary/accent/success/warning/danger).

## Step 2 — Navbar polish & accessibility
- Audit aria-labels, focus states, keyboard interaction.
- Ensure profile dropdown and mobile menu behave correctly (Esc / outside click).
- Make Search a reusable UI placeholder (modal/drawer) instead of inert button.

## Step 3 — Component completeness audit
- Compare implemented components vs required list in prompt.
- Add missing UI components (with dark mode support) if any are absent.

## Step 4 — Page state behaviors audit
- Login/Register/Forgot/OTP/Reset: mock validation, loading, error, success states.
- Upload: drag/drop, replace/remove, analyze loading/error/success.
- ResumeHistory: search/filter/sort/pagination + responsive.
- Profile/Settings: save interactions + toasts.

## Step 5 — Service placeholders + hooks
- Ensure axios service placeholder methods are used in hooks.
- Confirm frontend-only behavior (no persistence of files beyond mock).

## Step 6 — Performance & transitions
- Ensure route/page transitions are consistent.
- Memoize heavy components where appropriate.

## Step 7 — Final QA
- Run lint/build.
- Manual navigation across all routes.
- Verify dark/light toggle persists across reload.

