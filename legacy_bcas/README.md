# BCAS International University Placements — Responsive Website

A polished, mobile-first multi-page website concept for BCAS International University Placements, using the supplied BCAS logo and a navy/royal-blue, red and white visual system.

## Pages included

- `index.html` — homepage and guided study-planning finder
- `study-abroad.html` — destinations and study-abroad guidance
- `universities.html` — university finder information
- `courses.html` — searchable course areas and a browser-saved shortlist
- `apply.html` — accessible demo enquiry form
- `scholarships.html` — scholarship planning guidance
- `visa-guidance.html` — visa preparation and official-source reminders
- `success-stories.html` — student journey stories
- `blogs.html` — searchable and filterable student journal with article sections
- `student-portal.html` — student portal information/prototype
- `contact.html` — campus addresses and contact information

## UI and accessibility improvements

- Responsive desktop, tablet and mobile layouts; mobile navigation and fixed bottom quick navigation
- Smooth page entry transitions, scroll reveal animations, card hover transitions, reading progress indicator and back-to-top control
- Honors `prefers-reduced-motion` for visitors who disable animation
- Keyboard focus states, skip links where present, labelled form controls, accessible status announcements, and menu Escape/outside-click handling
- Course search and category filters work together; saved course shortlist persists in the current browser when local storage is available
- Study finder preferences are passed into the enquiry page
- Safe text rendering for browser-stored shortlist items
- Internal link, duplicate-ID and anchor checks passed during this update

## Run locally

1. Extract the ZIP file.
2. Open `BCAS-International-Placements-Professional/index.html` in a modern browser.
3. For a more production-like local setup, run a static web server from this folder, for example `python -m http.server 8000`, then visit `http://localhost:8000`.

## Important production notes

This package is a front-end website prototype. Demo enquiry forms store data only in the visitor's browser and do not submit it to BCAS. The student portal is not connected to an authentication system. Before production, connect a secure backend/CRM, implement real student authentication, verify current courses and partner universities, review scholarship and visa content, confirm campus/contact details, and add analytics/privacy/consent controls as required. Never collect passwords, passport numbers or financial details through the demo forms.

External photos are loaded from Unsplash and therefore require an internet connection. Replace or license final production photography before launch.
