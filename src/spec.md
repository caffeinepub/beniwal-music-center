# Specification

## Summary
**Goal:** Restore all site images so they render correctly in production, and replace the website icon/brand mark with new icon assets derived from the newly uploaded `download-2.webp`.

**Planned changes:**
- Generate a consistent set of icon assets (square brand mark, favicon 32x32, apple-touch-icon 180x180) from `download-2.webp`, and update the app to use them in the browser tab icon and in the header/footer logo.
- Fix broken/missing images by ensuring all referenced image assets are included in the deployed build and referenced using URL-safe paths (no unencoded spaces), with graceful UI behavior when optional images are absent.
- Rebuild/redeploy so the public link resolves successfully and serves the latest assets (including the new icon images), avoiding “Canister ID Not Resolved”.

**User-visible outcome:** The site loads from the public link without resolution errors, all hero/section images display without broken links, and the browser favicon plus header/footer logo match the new icon derived from `download-2.webp`.
