# Implase Dental Clinic website

Static one-page site for Implase Dental Clinic, Sheoraphuli. Plain HTML, CSS and a little vanilla JS. No build step. Hosted on GitHub Pages.

```
index.html      the whole site, sections in order: header, hero, about, treatments, gallery, book, contact, footer
privacy.html    short privacy page
style.css       colours, spacing, radii and type scale are custom properties at the top of the file
script.js       CONFIG object at the top, then the small scripts (links, hours, open/closed badge, booking embed, lightbox)
assets/img/     photos, one file per slot, see below
assets/img/CREDITS.md   source and photographer of the current stock photos
```

## Editing text, phone, hours and links

- **Phone, WhatsApp, email, Calendar and Maps embeds, Business Profile, social links, opening hours**: edit `CONFIG` at the top of `script.js`. Nothing else in the code repeats these values. Any value left as `"PLACEHOLDER"` is hidden on the page.
- **Hours** are in 24-hour time, Asia/Kolkata. Each day has a list of `[open, close]` ranges; an empty list means closed. The hours table, the "Open now / Closed now" badge and the search-engine structured data are all generated from this.
- **Headline, bio, qualifications, treatment descriptions, photo alt text**: edit the text directly in `index.html`. The About section was written from Dr Chandra's CV plus corrections from Dr Chandra.
- **Site address**: if the site is not at `https://implase.github.io/`, search and replace that URL in `index.html` (Open Graph and canonical tags), `script.js` (`siteUrl`), `robots.txt` and `sitemap.xml`.

## Replacing the photos

Each slot is a pair of files with the same name, `.webp` plus `.jpg` fallback. Replace both files, keep the names and sizes, and nothing in the code needs to change.

| Slot | Files | Size (px) | Where it appears |
|---|---|---|---|
| Hero | `hero.webp`, `hero.jpg` | 1600x900 | Top of the page; also the social-share image |
| Portrait | `portrait.webp`, `portrait.jpg` | 800x1000 | About Dr Chandra |
| Gallery | `gallery-01.webp` ... `gallery-06.webp` and `.jpg` | 1200x800 | Gallery, opens in the lightbox |

Keep every file under 200 KB. A quick way to make both formats from a JPEG, with `cwebp` installed:

```sh
cwebp -q 78 hero.jpg -o hero.webp
```

Update the alt text in `index.html` to describe the new photo. `assets/img/CREDITS.md` records where the photos came from.

## Booking form and clinic calendar

- **Booking form** (`bookingFormUrl` in `script.js`): the Google Form "Online Dental Appointment Booking" is embedded in the Book section. Edit questions in Google Forms; the URL stays the same. Replies land in the form's Responses tab, so check it (or turn on email notifications under Responses, the three-dot menu, "Get email notifications for new responses").
- **Clinic calendar** (`calendarEmbedUrl`): the implasedc@gmail.com calendar is shown in the Contact section. It only renders for visitors once the calendar is public: in Google Calendar on a computer, open Settings, pick the calendar under "Settings for my calendars", open "Access permissions for events" and tick "Make available to public". Until then visitors see a permission message in its place.
- **Online booking later**: if you create a Google Calendar *appointment schedule* (Create, Appointment schedule), its Share, Website embed URL can replace `calendarEmbedUrl` so patients pick a slot directly.

## Google Maps embed

The map currently uses a keyless Google Maps embed of the street address. To use the exact pin from your Business Profile:

1. Open [Google Maps](https://www.google.com/maps), search for the clinic, click **Share**, then **Embed a map**.
2. Copy the `src="..."` URL from the `<iframe>` code and paste it as `mapsEmbedUrl` in `script.js`.

Paste the Business Profile share link (from the **Share** button on your profile) as `businessProfileUrl`. It powers "Get directions" and "Read reviews".

## Publishing on GitHub Pages

Two options.

**Option A: user site.** The repository is named exactly `implase.github.io` (the GitHub account is `Implase`), push this code to its `main` branch, and the site is live at `https://implase.github.io/`. No settings needed.

**Option B: project site.** Push to any repository, then go to **Settings**, **Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, and save. The site is live at `https://<account>.github.io/<repo>/`. Update the site address as described above.

`.nojekyll` tells GitHub to serve the files as they are.

<!--
Custom domain later:
1. Add a file named CNAME in the repo root containing only the domain, e.g. implasedental.in
2. At the domain registrar, add a CNAME record from www to implase.github.io,
   and A records for the apex domain to GitHub's Pages IPs (see GitHub docs, "Managing a custom domain").
3. In Settings > Pages, enter the domain and tick "Enforce HTTPS" once the certificate is issued.
4. Replace https://implase.github.io/ everywhere, as above.
-->

## Local preview

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Checks done before hand-over

- Viewed at 375 px and 1280 px, light and dark scheme.
- Every image has alt text; images are lazy-loaded except the hero; WebP with JPEG fallback; all under 200 KB.
- Text and background pairs checked for WCAG AA contrast in both colour schemes. Orange is used only for the emergency line (bold, 20 px) and the Closed badge border.
- Lighthouse was not run (no headless Chrome on the build machine). Run it from Chrome DevTools after publishing.

## Still to do by a human

- [ ] Fill the remaining `PLACEHOLDER` values in `CONFIG` (`script.js`): Business Profile link, Instagram and Facebook. Check the email (taken from the CV) is the one patients should use.
- [ ] Confirm the opening hours in `CONFIG.hours` (currently 10:00 to 14:00 and 17:00 to 21:00 every day except Thursday, which is closed).
- [ ] Check the bio in the About section of `index.html`, which was written from the CV.
- [ ] Confirm the six treatments (written from the CV expertise list) and their descriptions in `index.html`.
- [x] Clinic photos are in place (supplied 2026-10-20). Swap any slot by replacing its two files and updating the alt text.
- [ ] Make the implasedc@gmail.com calendar public (see "Booking form and clinic calendar") so the embedded calendar shows for visitors.
- [ ] Replace the keyless map with the embed from Google Maps or the Business Profile. The keyless map currently drops its pin on a nearby landmark, not the exact shop.
- [ ] Create the GitHub repository, push, and enable Pages (Option A or B).
- [ ] If not using `implase.github.io`, update the site address in the four files listed above.
- [ ] Run Lighthouse in Chrome DevTools on the live site.
- [ ] Optional: custom domain (see the commented note above).
