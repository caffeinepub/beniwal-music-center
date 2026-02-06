# Specification

## Summary
**Goal:** Add a homepage image slider powered by a backend gallery, plus an admin-only panel (Internet Identity) to manage gallery images.

**Planned changes:**
- Backend: Create a Motoko gallery store that lists homepage images publicly (ordered) and supports admin-only add/delete/reorder (with image metadata like id, optional title/caption, sortOrder, createdAt, and an asset path or stored bytes).
- Backend: Enforce admin authorization by Principal for all gallery mutations; add methods to read the current admin Principal and transfer admin rights; persist admin state across upgrades.
- Backend/Frontend integration: When no images are stored in the canister, return a default gallery list that references the 7 uploaded images via static asset paths.
- Frontend: Add a responsive homepage carousel/slider that renders the backend gallery list with next/prev controls and mobile swipe/drag; use existing SafeImage fallbacks for missing/broken images.
- Frontend: Add an Admin Panel (English UI) with Internet Identity login that shows the logged-in principal and allows only the admin to upload images (JPEG/PNG), delete images, and reorder images; non-admins see an access denied state and no management controls.
- Frontend: Include the 7 user-uploaded images as static assets (preserving originals) and ensure default gallery references match actual repository filenames.

**User-visible outcome:** Visitors see a responsive homepage image slider. The admin can log in with Internet Identity to upload, delete, and reorder slider images, and the slider remains populated by default using the 7 uploaded images until the admin uploads new ones.
