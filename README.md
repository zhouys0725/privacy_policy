# Privacy Policy Site

Static bilingual privacy policy page for `拾音 Vois`, prepared for direct deployment to Vercel.

Photo Director has separate Chinese/English privacy and support pages under
`photo-director/`, served by the existing Vercel project `privacy-policy`:

- `/photo-director/privacy` and `/photo-director/privacy-en`
- `/photo-director/support` and `/photo-director/support-en`

These are static pages with one shared stylesheet and no scripts, forms,
analytics or new backend. The existing Vois homepage and policy are unchanged.
Photo Director's native links use `https://privacy-policy-ivory-two.vercel.app`.
Update the AI-provider disclosure before enabling public cloud analysis; the
current policy accurately states that analysis is unavailable. Publishing this
policy does not establish App Store approval or physical-device acceptance.

## Files

- `index.html`: bilingual primary public page with language switch
- `aicv.html`: compatibility redirect for the old path
- `vercel.json`: static deployment config

## Deploy to Vercel

1. Push this directory to a Git repository.
2. Import the repository in Vercel.
3. Framework Preset: `Other`
4. Build Command: leave empty
5. Output Directory: leave empty
6. Deploy

## Before Going Live

Review the policy text carefully and confirm:

- the app name and operator information are correct
- the listed personal data types match actual collection behavior
- the retention periods are accurate
- all third-party services are included
- the contact email is valid
- the Chinese wording matches the legal meaning you intend to publish
