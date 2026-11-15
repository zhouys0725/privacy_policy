# Privacy and support site

Static bilingual legal pages served by the existing Vercel project
`privacy-policy-ivory-two.vercel.app`.

## Yuno routes

- `/` and `/privacy`: Chinese privacy policy
- `/privacy-en`: English privacy policy
- `/support` and `/support-en`: Chinese and English support
- `/terms` and `/terms-en`: Chinese and English browser terms

The root URL remains the App Store privacy-policy address. `vercel.json`
rewrites it to the current Yuno policy without changing the public URL.

Photo Director keeps its separate pages under `/photo-director/`.

## Product facts reflected in the policy

- Accounts use email, Apple, Google or enabled WeChat/SMS sign-in.
- Financial data is entered by the user; the app does not read bank statements.
- AI is opt-in. A question, selected recent context and bounded tool results
  are sent to the configured model service; the whole book is not sent at once.
- Cloudflare D1 is the current production database. PostgreSQL/Neon is an
  alternative deployment mode.
- Payments use the channel actually enabled in the app. Production enablement
  remains a separate commercial acceptance item.
- Book deletion is distinct from full account deletion. Full account closure is
  handled through the published support address until an in-app flow is shipped.

## Deploy

This is a static project with no build step. Deploy the repository root to the
existing Vercel project. Changes take effect only after a successful production
deployment; verify the public routes after deployment.
