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


## Local preview

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Webpage

Open: [Webpage](https://implase.github.io/)
