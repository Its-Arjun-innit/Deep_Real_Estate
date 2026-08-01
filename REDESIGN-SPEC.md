# Deep Real Estate — Website Redesign Spec

> **Purpose:** Single source of truth for rebuilding `deeprealestate.in` in a modern, prettier
> format. **The design changes; the content does not.** Every piece of copy below is scraped
> verbatim from the live site and must be reused as-is. Do not rewrite, paraphrase, or drop
> content — only the visual design, layout, and structure change.
>
> Scraped: 2026-08-01. Source: https://deeprealestate.in (single WordPress site — no real
> subdomains, only the subpages listed here).

---

## 0. Ground rules for the rebuild

1. **Content is constant.** Reuse all text verbatim. Legal pages (Privacy, Terms) must be
   copied from the live site at build time, not rewritten.
2. **Design is the deliverable.** Modern, clean, trust-forward real-estate aesthetic (see §7).
3. **Recommended stack:** **Astro + Tailwind CSS.** Static-first, shared layout/components
   across ~11 pages, top performance, no heavy runtime. A property "content collection" can
   hold listings; add search/login later only if needed. (Nothing here forces a specific stack —
   swap if preferred.)

---

## 1. Brand & positioning

- **Name:** Deep Real Estate (also styled "Deep Realestate")
- **Established:** 2005 (© 2005–2025)
- **What:** Fully-licensed Haryana real-estate agency. Helps clients buy/sell property in the
  Gurgaon market through a "streamlined, transparent, customer-focused" process, combining
  "industry's top talent with technology to make the search and sell experience intelligent and
  seamless."
- **Service area:** Gurugram, Manesar, Dharuhera, Sohna.
- **Core value prop (used on Home & About):**
  > "Your search for the best suitable property as per your budget and desired location ends
  > here. We have best Industry's top talent with technology to make the search and sell
  > experience intelligent and seamless."

### Logo — action required
Source files in this directory: `deep.cdr` (CorelDRAW), `deep.pdf`. **Neither is web-usable and
they could not be rendered in the build environment.** Before building:
- Export logo to **SVG** (primary, for crisp scaling) and **PNG with transparent background**
  (fallback / social).
- Provide light and dark variants if the logo is single-color.
- Derive the site's final color palette from the logo colors (see §7 tokens).

---

## 2. Contact / NAP — used site-wide (header + footer)

| Field | Value |
|-------|-------|
| Address | G-564, Sushant Lok-II Extn. Sector 57, Nr. Scottish High, Gurgaon, Haryana-122002, India |
| Phone (landline) | +91-124-4080100 |
| Phone (mobile) | +91-9810922338 |
| Phone (Free Support) | +91-9599639738 |
| Email | info@deeprealestate.in |
| Social | Facebook, Instagram |
| Footer line | © 2005–2025 Deep Real Estate · Managed by Asterisk Serve |

Header should surface the phone number + a prominent **"Buy / Sell Property"** CTA. Existing site
also has **Login** and **Compare** — treat as optional/deferred (see §6).

---

## 3. Sitemap / information architecture

| Page | Path | Notes |
|------|------|-------|
| Home | `/` | Landing |
| About Us | `/about-us/` | |
| Projects | dropdown | Residential / Commercial / Plots (category listings; currently sparse) |
| Maps | `/maps/` | Master plans + sector/project map library (Google Drive links) |
| Documents | `/documents/` | Downloadable legal/transaction doc library |
| FAQ | `/frequently-asked-questions/` | 8 Q&A |
| Free Support | `/free-support/` | No-commission assistance |
| Contact Us | `/contact/` | Form + NAP |
| Privacy Policy | `/privacy-policy/` | Legal, updated 2022-07-04 |
| Terms & Conditions | `/terms-and-conditions/` | Legal |
| Property detail | `/property/{slug}/` | Template; 2 live listings |
| Login / Compare | — | **Deferred** unless requested |

Primary nav: Home · About Us · Projects ▾ · Maps · More ▾ (Documents, Privacy, FAQ, Terms) ·
Contact Us · Free Support · **[Buy / Sell Property]**

---

## 4. Page-by-page content

### 4.1 Home (`/`)
Sections, top to bottom:
1. **Hero** — "Welcome to Deep Realestate" + value prop (§1). CTA to browse / contact.
2. **Maps teaser** — sector visualization + master plan access → links to Maps page.
3. **Stats band:**
   - **900** Properties-in-hand
   - **25** Team strength
   - **1200** Happy clients
4. **Our Process** (4 steps): **Reach Us → Choose Location → Choose Property → Confirmation**
5. **Featured Properties** — the 2 listings (§4.10).
6. **Top Properties in Cities** — city-grouped listings.
7. **What People Said** — testimonials carousel.

### 4.2 About Us (`/about-us/`)
- Value prop (§1).
- Stats: 900 Properties-in-Hand · 25 Team Strength · 1200 Happy Clients.
- **Mission & vision** — commits to helping clients make wise, profitable property decisions in
  Gurgaon. Believes in: performance across all lines of business; delivering tangible benefits to
  clients; solid fundamentals; profitable results.
- **Partner developers:** DLF, Bestech, BPTP, Unitech, Earthtech, Emaar, Suncity, SS Group,
  Erose, Parswanath, Central Park, Spaze, Antariksh, Universal, KLJ.
  *(Design: render as a logo wall if developer logos are supplied; else styled text chips.)*

### 4.3 Maps (`/maps/`)
Downloadable maps, each linking to a Google Drive resource. Preserve every item. Suggested UI:
searchable/filterable accordion grouped by category.

- **Master Plans (4):** Gurgaon (MASTERPLAN), Manesar, Dharuhera, Sohna Masterplan
- **DLF (7):** DLF 1, 2, 3, 4, 5, DLF Alameda, DLF Garden City
- **HUDA Sectors (28):** Sectors 4, 5, 7, 7 Ext., 9-10A, 12A, 14, 15, 16, 17, 21, 22, 23A, 27,
  28, 29, 31, 32, 33, 34, 38, 39, 40, 43, 44, 45, 46, 47, 51, 52, 57
  *(list as scraped; verify exact set against live Drive links at build time)*
- **Sushant Lok (4):** Phase 1, 2, 3, 4
- **South City (2):** South City 1, 2
- **Vatika (5):** Vatika 1–5
- **Builder Projects (15):** Anant Raj, BPTP Amstoria, Emerald Floors, Greenwood City, Malibu
  Town, Mayfield Garden, Nirvana, Raheja, Palam Vihar, Rosewood City, Saraswati Vihar, Ireo
  City, Suncity, Uppal Southend, Vipul World
- **Udyog Vihar (3):** Pace City 1, Pace City 2, Udyog Vihar

> **Build note:** the actual Google Drive URLs must be copied from the live Maps page — they are
> not reproduced here. Preserve each map→Drive link exactly.

### 4.4 Documents (`/documents/`)
Downloadable transaction/legal document library. Preserve all; group as below. (Actual file
links to be copied from live site at build time.)

- **General (7):** Special Power of Attorney; GPA for NRI; Gift Deed for Relative; Agreement to
  Sale; Part Payment; Lease Deed; Form 60.
- **HUDA-specific (13):** Application of Plot Possession; Seller NOC; Affidavit for Reserve
  Category Allotment; Specimen Signature Affidavit; Advance Receipt; Agreement to Sale (if sold
  on attorney); Final Joint Affidavit; Certificate of Possession of Plot; Acceptance of
  Allotment; Affidavit for Allotment Money Deposit; Application of Plot Possession in Triplicate;
  Will; Final Affidavit from Purchaser.
- **Property formats (7):** Floor Partition Deed; Agreement to Sale of Plot in Sushant Lok;
  Advance Receipt (English); Agreement to Sale of Floors in Private Builder Colony; Agreement to
  Sale for Agricultural Land; Transfer Deed; Agreement to Sale on House in Sushant Lok.

### 4.5 FAQ (`/frequently-asked-questions/`)
8 Q&A pairs, verbatim, in order:

1. **Q: I'd like to sell my property. What documentation would I need to provide a buyer?**
   A: The original Sale Deed, Title Deed, pertinent tax receipts, and Encumbrance Certificate may
   be requested by purchasers.
2. **Q: Stamp duty is paid by the buyer or seller?**
   A: Only the buyer pays the Stamp Duty.
3. **Q: Is there a process/form to fill before the Sale Deed or Transfer Document can be executed?**
   A: Yes — procedures and forms vary by state; each state in India has its own set of forms.
   Both parties must provide PAN numbers; either party may need Income Tax Form 60. An NRI not
   assessed for taxes in India may be exempt.
4. **Q: Do legal papers for property sales have to be registered?**
   A: Yes. You can complete it at the district's sub-registrar's office.
5. **Q: When does a residential property sale become official?**
   A: When the seller has received the full purchase price, the documents have been registered,
   and the buyer has been given physical possession.
6. **Q: What help does Deep Real provide to property brokers?**
   A: Brokers can list properties for sale through the inquiry form on the website, connecting
   with buyers at no additional cost.
7. **Q: How soon after I list my property would I get a call?**
   A: Within 15 minutes during business hours (9am–10pm), or the next business day otherwise.
8. **Q: How does Deep Real help if I want to sell my property?**
   A: Complete an inquiry form, available on the website's front page.

### 4.6 Free Support (`/free-support/`)
- Headline: **"We are happy to provide you free services on your property sale or purchase
  without commission."**
- Contact: +91-9599639738 (plus site-wide numbers).
- CTA: get in touch / inquiry form.

### 4.7 Contact Us (`/contact/`)
- Sections: Head Office · Phone Number · Emails · Send a message (contact form) · Get in touch.
- NAP block (§2). Include map embed of the office address.
- Contact form fields (rebuild): Name, Email, Phone, Message + submit.

### 4.8 Privacy Policy (`/privacy-policy/`)
Legal page, last updated **2022-07-04**. **Copy verbatim from live site.** Sections:
Interpretation & Definitions · Data Collection · Tracking Technologies (cookies) · Use of
Personal Data · Data Sharing · Data Retention & Transfer · Disclosure Requirements · Security ·
Children's Privacy & Third-Party Links · Contact.

### 4.9 Terms & Conditions (`/terms-and-conditions/`)
Legal page. **Copy verbatim from live site.** ~21 sections: Introduction · Communications ·
Contests & Promotions · Content Rights · Prohibited Uses · Analytics · Age Restriction (18+) ·
Intellectual Property & Copyright/DMCA · Feedback · Third-Party Links · Disclaimers · Liability
Limits · Termination · Governing Law (India) · Amendments · Acknowledgment · Contact.

### 4.10 Property listings (2 live)

**A. 4 BHK Luxury Floors – Suncity** — `/property/premium-4-bhk-luxury-floors-for-sale-d-block-suncity/`
| Field | Value |
|-------|-------|
| Property ID | 112 |
| Price | ₹5.50 Cr (4th floor w/ private terrace) · ₹4.60 Cr (1st floor) |
| Location | D Block, Suncity, Gurugram, Haryana, India |
| Type / Status | Apartment, Residential · For Sale (immediate possession) |
| Bedrooms / Bathrooms | 4 / 4 |
| Built-up area | 2,664 SqFt |
| Plot size | 296 sq. yards |
| Builder | Independent Builder |
| Corner property | Yes |

Features: spacious layouts, premium finishes; dedicated guest waiting area; servant quarters;
ample parking; private terrace (4th floor); corner positioning with excellent ventilation.
Description: premium Suncity neighborhood; 4th floor has exclusive private terrace (entertaining
/ rooftop garden); near schools, hospitals, shopping.

**B. Premium Farmhouse – Garat Pur Bas** — `/property/premium-farmhouse/`
| Field | Value |
|-------|-------|
| Property ID | 111 |
| Price | On call (₹30,000 per sq. yard) |
| Location | Village Garat Pur Bas, Gurugram, Haryana, India |
| Type / Status | Farm / Farmhouse plot · For Sale |
| Total area | 3,000 sq. yards |
| Road access | 30-meter wide main road |

Features: prime location, excellent connectivity; ideal for luxury farmhouse development; ample
open space, peaceful rural environment; high appreciation potential; clear title, hassle-free
documentation. Ideal uses: personal luxury farmhouse, investment, weekend home, resort/eco-stay.

### 4.11 Property detail template (fields for future listings)
Title · Price (support ranges & "on call") · Location · Property ID · Type · Status · Bedrooms ·
Bathrooms · Built-up area · Plot size · Builder · Corner (bool) · Description (rich text) ·
Features list · Gallery · Agent card (Deep Real Estate NAP §2) · Inquiry CTA.

---

## 5. Reusable components (for the rebuild)

Header/nav (sticky, phone + Buy/Sell CTA) · Hero · Animated stat counter · Process-steps strip ·
Property card · Property detail layout · Map-category accordion (with Drive links) ·
Document-download list · FAQ accordion · Testimonial carousel · Contact form · Developer logo
wall · Footer (NAP + social + copyright).

---

## 6. Deferred / optional

- **Login & Compare** — exist on current site; rebuild only if a user account/portal is wanted.
- **Projects category pages** (Residential/Commercial/Plots) — currently sparse; drive them from
  the property collection filtered by type.
- **Testimonials** — pull actual quotes from live site at build time (not captured here).

---

## 7. Design direction ("major changes")

**Feel:** modern, premium, trustworthy real-estate. Clean typography, generous whitespace, large
property imagery, strong stat/trust emphasis, clear CTAs.

**Layout & UX**
- Sticky top nav; phone number and **Buy / Sell Property** always visible.
- Mobile-first, fully responsive. Fast (static, optimized images: WebP/AVIF, lazy-load).
- Accessible: WCAG 2.1 AA contrast, keyboard nav, focus states, alt text, semantic landmarks.
- Map & document libraries: searchable + filterable accordions instead of long flat lists.

**Design tokens (placeholders — finalize from logo colors)**
```
--color-primary:    #1a3c5e   /* deep navy/blue — trust; replace w/ logo primary */
--color-accent:     #c9a227   /* gold — premium; replace w/ logo accent */
--color-bg:         #ffffff
--color-surface:    #f5f7fa
--color-text:       #1f2933
--color-muted:      #6b7280
--font-heading:     "Poppins" / "Sora"          /* geometric, confident */
--font-body:        "Inter" / system-ui          /* readable */
--radius:           12px
--shadow:           subtle, soft, layered
```

**Asset checklist (gather before build)**
- [ ] Logo exported to SVG + transparent PNG (from `deep.cdr` / `deep.pdf`)
- [ ] Final color palette derived from logo
- [ ] Property photos (both listings)
- [ ] Google Drive URLs for every map (copy from live Maps page)
- [ ] Document file URLs (copy from live Documents page)
- [ ] Developer logos (for About logo wall) — optional
- [ ] Testimonial quotes (copy from live Home page)
- [ ] Favicon
- [ ] Verbatim Privacy Policy & Terms text (copy from live legal pages)

---

## 8. Build-time verification

- Every nav page (§3) has a corresponding built page; nothing dropped.
- Both property listings match §4.10 exactly (IDs 112 & 111, prices, areas).
- All three phone numbers, email, and address match §2 site-wide.
- Map (4+7+28+4+2+5+15+3) and document (7+13+7) categories all present with working links.
- Privacy & Terms copied verbatim, not rewritten.
- Logo renders as SVG; palette matches logo; Lighthouse a11y + perf pass.
