# Zombie Run Privacy — publishing contract

The canonical policy source is `privacy-site/` in the private `maqueteinplace/zombie_play` repository. Keep this public repository as the standalone Pages mirror of that folder.

- Prepare and verify edits on `dev_zombie` in the game repository. Never publish that branch to this repository's `main`.
- After an explicit production request has promoted the matching game snapshot to `main`, sync this subtree from the game repository with `git subtree push --prefix=privacy-site privacy main`.
- GitHub Pages deploys only pushes to this repository's `main`. Verify the Actions run and `https://maqueteinplace.github.io/zombie-privacy/` after publishing.
- Keep the page bilingual, responsive, self-contained, and accurate to the current app. Check the actual Android manifest, Preferences implementation, app integrations, and hosting behavior before changing factual claims.
- Run `node scripts/check-privacy.mjs` before promotion. Do not add analytics, ad tags, third-party fonts, or remote assets without updating the policy and obtaining explicit product approval.
