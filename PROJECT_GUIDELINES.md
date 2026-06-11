PROJECT STRUCTURE (Narayanleela School)
Narayanleela/

├── public/
│   │
│   ├── images/
│   │   ├── hero/
│   │   ├── facilities/
│   │   ├── gallery/
│   │   ├── academics/
│   │   ├── principal/
│   │   ├── events/
│   │   ├── testimonials/
│   │   └── common/
│   │
│   ├── videos/
│   │
│   ├── icons/
│   │
│   ├── documents/
│   │   ├── admission-form.pdf
│   │   ├── prospectus.pdf
│   │   └── school-brochure.pdf
│   │
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
│
├── src/
│
│   ├── app/
│   │
│   │   ├── page.tsx
│   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │
│   │   ├── academics/
│   │   │   └── page.tsx
│   │
│   │   ├── facilities/
│   │   │   └── page.tsx
│   │
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │
│   │   ├── admissions/
│   │   │   └── page.tsx
│   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │
│   │   ├── not-found.tsx
│   │
│   │   ├── sitemap.ts
│   │
│   │   ├── robots.ts
│   │
│   │   ├── layout.tsx
│   │
│   │   └── globals.css
│
│
│   ├── components/
│   │
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── mobile-menu.tsx
│   │   │   ├── footer.tsx
│   │   │   └── page-banner.tsx
│   │
│   │   ├── sections/
│   │   │
│   │   ├── home/
│   │   │   ├── hero.tsx
│   │   │   ├── stats.tsx
│   │   │   ├── why-choose-us.tsx
│   │   │   ├── principal-message.tsx
│   │   │   ├── academics-preview.tsx
│   │   │   ├── facilities-preview.tsx
│   │   │   ├── student-life.tsx
│   │   │   ├── achievements.tsx
│   │   │   ├── events.tsx
│   │   │   ├── gallery-preview.tsx
│   │   │   ├── testimonials.tsx
│   │   │   └── admission-cta.tsx
│   │
│   │   ├── about/
│   │   │   ├── school-history.tsx
│   │   │   ├── vision.tsx
│   │   │   ├── mission.tsx
│   │   │   ├── values.tsx
│   │   │   ├── principal.tsx
│   │   │   └── timeline.tsx
│   │
│   │   ├── academics/
│   │   │   ├── curriculum.tsx
│   │   │   ├── methodology.tsx
│   │   │   ├── activities.tsx
│   │   │   └── assessment.tsx
│   │
│   │   ├── facilities/
│   │   │   ├── library.tsx
│   │   │   ├── computer-lab.tsx
│   │   │   ├── smart-classroom.tsx
│   │   │   ├── sports.tsx
│   │   │   └── transportation.tsx
│   │
│   │   ├── gallery/
│   │   │   ├── photo-gallery.tsx
│   │   │   └── video-gallery.tsx
│   │
│   │   ├── admissions/
│   │   │   ├── process.tsx
│   │   │   ├── eligibility.tsx
│   │   │   ├── documents.tsx
│   │   │   └── faq.tsx
│   │
│   │   └── contact/
│   │       ├── contact-form.tsx
│   │       ├── contact-details.tsx
│   │       └── map.tsx
│   │
│   │
│   │
│   ├── ui/
│   │
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── forms/
│   │   ├── badges/
│   │   ├── modals/
│   │   ├── animations/
│   │   └── loaders/
│   │
│
│   ├── data/
│   │
│   │   ├── school.ts
│   │   ├── facilities.ts
│   │   ├── academics.ts
│   │   ├── testimonials.ts
│   │   ├── gallery.ts
│   │   ├── events.ts
│   │   └── faqs.ts
│
│
│   ├── lib/
│   │
│   │   ├── seo.ts
│   │   ├── schema.ts
│   │   ├── metadata.ts
│   │   ├── animations.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│
│
│   ├── hooks/
│   │
│   │   ├── use-mobile.ts
│   │   ├── use-scroll.ts
│   │   ├── use-theme.ts
│   │   └── use-counter.ts
│
│
│   ├── types/
│   │
│   │   ├── school.ts
│   │   ├── facility.ts
│   │   ├── event.ts
│   │   ├── gallery.ts
│   │   └── testimonial.ts
│
│
│   ├── styles/
│   │
│   │   ├── variables.css
│   │   ├── animations.css
│   │   └── typography.css
│
│
│   ├── constants/
│   │
│   │   ├── routes.ts
│   │   ├── theme.ts
│   │   ├── seo.ts
│   │   └── site.ts
│
│
│   └── providers/
│       │
│       ├── theme-provider.tsx
│       └── animation-provider.tsx
│
│
├── .env.local
│
├── next.config.ts
│
├── package.json
│
├── tsconfig.json
│
├── README.md
│
└── PROJECT_GUIDELINES.md

FUTURE DATABASE READY

Later when adding PostgreSQL:
src/

├── db/
│   ├── schema.ts
│   ├── connection.ts
│   └── migrations/

FUTURE BACKEND READY

If adding API Routes:
app/

api/

contact/
route.ts

gallery/
route.ts

admissions/
route.ts

events/
route.ts

FUTURE ADMIN PANEL READY
app/

admin/

dashboard/
page.tsx

events/
page.tsx

gallery/
page.tsx

admissions/
page.tsx
SEO FILES YOU MUST HAVE
lib/

seo.ts
schema.ts
metadata.ts

These should handle:

Meta Title
Meta Description
Open Graph
Twitter Cards
Canonical URLs
Educational Organization Schema
School Schema
FAQ Schema
Breadcrumb Schema
COMPONENT RULES

Every component should:

One Component
One Responsibility
One Folder

Bad:

Hero
Stats
Gallery
Testimonials

inside one file

Good:

Hero.tsx

Stats.tsx

Gallery.tsx

Testimonials.tsx
PERFORMANCE RULES

Always:

✅ next/image

✅ dynamic imports

✅ lazy loading

✅ AVIF images

✅ WebP fallback

✅ font optimization

✅ code splitting

Never:

❌ huge videos

❌ unoptimized PNGs

❌ 20 animation libraries

❌ large UI libraries

DEVELOPMENT ORDER
Setup Project
Theme System
Typography
Navbar
Footer
Home Page
About
Academics
Facilities
Gallery
Admissions
Contact
SEO
Schema
Performance Audit
Deployment