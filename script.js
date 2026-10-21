"use strict";

/* Everything a human may need to change lives here. "PLACEHOLDER" hides the matching link. */
const CONFIG = {
  phone: "+91 86709 72908",
  whatsappUrl: "https://wa.me/918670972908?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Implase%20Dental%20Clinic",
  email: "drschandra9@gmail.com",
  bookingFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdEZZ-6gjmlci0jJuzGl47eDxTPxRB5adKHsZSA7tgGTe7BOg/viewform?embedded=true",
  calendarEmbedUrl: "https://calendar.google.com/calendar/embed?src=implasedc%40gmail.com&ctz=Asia%2FKolkata",
  mapsEmbedUrl: "https://www.google.com/maps?q=212%2F145%20Zaminder%20Road%2C%20Sheoraphuli%2C%20West%20Bengal%20712223&output=embed",
  businessProfileUrl: "PLACEHOLDER",
  socials: { Instagram: "PLACEHOLDER", Facebook: "PLACEHOLDER" },
  // 24-hour clock, Asia/Kolkata. An empty list means closed that day.
  hours: {
    Monday:    [["10:00", "14:00"], ["17:00", "21:00"]],
    Tuesday:   [["10:00", "14:00"], ["17:00", "21:00"]],
    Wednesday: [["10:00", "14:00"], ["17:00", "21:00"]],
    Thursday:  [],
    Friday:    [["10:00", "14:00"], ["17:00", "21:00"]],
    Saturday:  [["10:00", "14:00"], ["17:00", "21:00"]],
    Sunday:    [["10:00", "14:00"], ["17:00", "21:00"]]
  },
  siteUrl: "https://implasedental.github.io/",
  address: { street: "212/145, Zaminder Road, opposite Ramkrishna Sweet Shop", locality: "Sheoraphuli", region: "West Bengal", postalCode: "712223", country: "IN" }
};

const isSet = (v) => Boolean(v) && v !== "PLACEHOLDER";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const addressLine = `${CONFIG.address.street}, ${CONFIG.address.locality}, ${CONFIG.address.region} ${CONFIG.address.postalCode}`;

/* Contact links */
const links = {
  phone: { href: "tel:+" + CONFIG.phone.replace(/\D/g, ""), text: CONFIG.phone },
  whatsapp: { href: CONFIG.whatsappUrl },
  email: { href: isSet(CONFIG.email) ? "mailto:" + CONFIG.email : "", text: CONFIG.email },
  reviews: { href: CONFIG.businessProfileUrl },
  directions: { href: isSet(CONFIG.businessProfileUrl) ? CONFIG.businessProfileUrl : "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(addressLine) }
};
$$("[data-link]").forEach((a) => {
  const l = links[a.dataset.link];
  if (!isSet(l.href)) { (a.closest("li") || a).hidden = true; return; }
  a.href = l.href;
  if (a.hasAttribute("data-text")) a.textContent = l.text;
});

const socials = Object.entries(CONFIG.socials).filter(([, url]) => isSet(url));
$("#socials").innerHTML = socials.map(([name, url]) => `<li><a href="${url}" rel="noopener">${name}</a></li>`).join("");
$("#socials").hidden = socials.length === 0;

$("#map").src = CONFIG.mapsEmbedUrl;
if (isSet(CONFIG.calendarEmbedUrl)) $("#calendar-view").src = CONFIG.calendarEmbedUrl; else $("#calendar-view").hidden = true;
$("#year").textContent = new Date().getFullYear();

/* Hours table and open/closed badge */
const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const isOpen = (hours, day, minutes) => (hours[day] || []).some(([a, b]) => toMin(a) <= minutes && minutes < toMin(b));
console.assert(isOpen({ Monday: [["10:00", "14:00"]] }, "Monday", 630) && !isOpen({ Monday: [["10:00", "14:00"]] }, "Monday", 840) && !isOpen({ Monday: [] }, "Monday", 630), "isOpen self-check failed");

$("#hours tbody").innerHTML = Object.entries(CONFIG.hours)
  .map(([day, ranges]) => `<tr><th scope="row">${day}</th><td>${ranges.length ? ranges.map(([a, b]) => `${a}–${b}`).join(", ") : "Closed"}</td></tr>`)
  .join("");

function updateBadge() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "long", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  const open = isOpen(CONFIG.hours, get("weekday"), Number(get("hour")) * 60 + Number(get("minute")));
  const badge = $("#open-badge");
  badge.textContent = open ? "Open now" : "Closed now";
  badge.className = "badge " + (open ? "open" : "closed");
}
updateBadge();
setInterval(updateBadge, 60000);

/* Booking form; the HTML notice stays if it is not set */
if (isSet(CONFIG.bookingFormUrl)) {
  $("#calendar").innerHTML = `
    <p class="muted" id="cal-loading">Loading the booking form…</p>
    <iframe src="${CONFIG.bookingFormUrl}" title="Online appointment booking form" loading="lazy"></iframe>
    <p><a href="${CONFIG.bookingFormUrl}" target="_blank" rel="noopener">Open the booking form in a new tab</a> if it is hard to use on a small screen.</p>`;
  $("#calendar iframe").addEventListener("load", () => $("#cal-loading").remove());
}

/* Structured data, built from CONFIG so hours and phone have one source */
const ld = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Implase Dental Clinic",
  url: CONFIG.siteUrl,
  image: CONFIG.siteUrl + "assets/img/hero.jpg",
  telephone: "+" + CONFIG.phone.replace(/\D/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: CONFIG.address.street,
    addressLocality: CONFIG.address.locality,
    addressRegion: CONFIG.address.region,
    postalCode: CONFIG.address.postalCode,
    addressCountry: CONFIG.address.country
  },
  openingHoursSpecification: Object.entries(CONFIG.hours).flatMap(([day, ranges]) =>
    ranges.map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: day, opens, closes })))
};
const ldScript = document.createElement("script");
ldScript.type = "application/ld+json";
ldScript.textContent = JSON.stringify(ld);
document.head.append(ldScript);

/* Mobile menu */
const menuBtn = $(".menu-btn");
const nav = $("#nav");
menuBtn.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") !== "true";
  menuBtn.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
});
$$("#nav a").forEach((a) => a.addEventListener("click", () => { menuBtn.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); }));

/* Gallery lightbox: <dialog> handles Esc and returns focus on close */
const items = $$("#gallery a");
const lightbox = $("#lightbox");
const lbImg = $("#lightbox img");
const lbCaption = $("#lightbox figcaption");
let current = 0;
function show(n) {
  current = (n + items.length) % items.length;
  const thumb = $("img", items[current]);
  lbImg.src = thumb.currentSrc || items[current].href;
  lbImg.alt = thumb.alt;
  lbCaption.textContent = thumb.alt;
}
items.forEach((a, n) => a.addEventListener("click", (e) => { e.preventDefault(); show(n); lightbox.showModal(); }));
$("#lb-prev").addEventListener("click", () => show(current - 1));
$("#lb-next").addEventListener("click", () => show(current + 1));
$("#lb-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });
