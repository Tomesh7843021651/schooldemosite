PROJECT_GUIDELINES.md
Narayanleela English Medium School Website
Version 1.0 (Frontend First Architecture)
1. Project Vision

We are building a premium, modern, trust-focused school website for Narayanleela English Medium School.

Reference Website:

School Demo Reference

The goal is NOT to copy the design.

The goal is to create a website that:

Looks more modern than SchoolDemo
Loads faster
Has better mobile experience
Has better SEO
Builds parent trust immediately
Increases admission inquiries
Supports English, Hindi and Marathi
Can be expanded later with PostgreSQL, Admin Panel and Backend APIs

The homepage should act as the school's digital admission brochure.

Parents should feel:

Trust
Safety
Professionalism
Academic Excellence
Student Growth
Premium Education

within the first few seconds. Research on school website structure consistently emphasizes trust, clear navigation, admissions information, school mission, and easy access to important information as primary goals.

2. Technology Stack
Current Stack
Next.js 15
TypeScript
Tailwind CSS
Shadcn UI
Framer Motion
next-intl
Future Stack
PostgreSQL
Vercel Postgres / Neon

Cloudinary / ImageKit

Admin Panel

API Routes

Spring Boot (Optional)
Hosting
Frontend:
Vercel

Domain:
Custom School Domain
3. Website Purpose

The website exists to:

Primary Goal

Generate Admission Inquiries

Secondary Goals
Build parent trust
Showcase academics
Showcase facilities
Showcase achievements
Improve Google rankings
Improve school branding
4. User Personas
Parents

Need:

Trust
Safety
Academic Quality
Facilities
Admission Information
Students

Need:

Activities
Sports
Achievements
Gallery
School Management

Need:

Professional Branding
Admissions
Visibility
5. Core Design Philosophy

The website should feel like:

Premium
Elegant
Educational
Modern
Trustworthy
Professional

NOT:

Gaming Website
Corporate SaaS
Agency Website
Flashy Startup

School websites should prioritize clarity, trust, navigation, and accessibility over flashy effects.

6. Color System
Light Theme
Primary:
#0F4C81

Royal Blue

Secondary:
#D4A017

Premium Gold

Accent:
#2A9D8F

Matte Teal

Background:
#F8FAFC

Text:
#111827
Dark Theme
Background:
#24112D

Surface:
#30193D

Primary:
#6FA8FF

Secondary:
#F4C95D

Accent:
#4FC3B3
7. Typography
Heading Font

Cormorant Garamond

Purpose:

Luxury
Premium
Academic
Royal
Body Font

Inter

Purpose:

Modern
Readable
Mobile Friendly
Typography Rules
Maximum Fonts:
2

Never Use:
More than 2 Fonts
8. Multilingual Architecture

Supported Languages:

English

Hindi

Marathi

Locale Structure:

/en

/hi

/mr

Folder:

src/app/[locale]

Reason:

SEO
Scalability
Future Proof
9. SEO Strategy

Target Keywords:

Best School in Arni

English Medium School in Arni

Top School in Arni

School Admissions Arni

Primary School in Arni

Secondary School in Arni

Quality Education in Arni
SEO Goals
SEO Score:
100

Performance:
95+

Accessibility:
95+

Best Practices:
95+
Future Schema
EducationalOrganization

School

Organization

Breadcrumb

FAQ
10. Design System Rules
Container

Every section:

max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Section Spacing
py-16 md:py-24 lg:py-32
Card Radius
rounded-2xl

Premium Cards:

rounded-3xl
Shadows
shadow-sm

shadow-lg

Only.

11. Animation Rules

Library:

Framer Motion

Only.

Allowed:

Fade Up

Scale In

Slide Up

Hover Lift

Forbidden:

Particles

Heavy Parallax

GSAP

Lottie

3D Effects
12. Mobile First Strategy

Most school traffic will come from:

Mobile Devices

Therefore:

Design Mobile First

Then Tablet

Then Desktop

Breakpoints:

320

375

425

768

1024

1440
13. Website Structure
Main Navigation
Home

About

Academics

Facilities

Gallery

Admissions

Contact

This aligns with common school website navigation best practices that emphasize simple, descriptive menu structures.

14. Homepage Architecture

Homepage is the most important page.

Purpose:

Trust

Education

Facilities

Admissions
Homepage Flow
Section 1

Hero

Section 2

Statistics

Section 3

Why Choose Us

Section 4

Principal Message

Section 5

Academic Excellence

Section 6

Facilities

Section 7

Student Life

Section 8

Achievements

Section 9

Events

Section 10

Gallery Preview

Section 11

Parent Testimonials

Section 12

Admission CTA

Section 13

Footer

This follows school homepage best-practice patterns where mission, academics, facilities, admissions, and trust-building content are prioritized.

15. Hero Section

Purpose:

First Impression

Contents:

School Building

Headline

Subheadline

Admissions CTA

Contact CTA

Trust Indicators

Example:

Nurturing Young Minds,
Building Future Leaders
16. Parent Trust Elements

Must appear early:

Principal Message

Real School Photos

Facilities

Student Activities

Achievements

Contact Information
17. Facilities Section

Show:

Smart Classrooms

Computer Lab

Science Lab

Library

Sports

Transportation
18. Academics Section

Show:

Pre Primary

Primary

Secondary
19. Gallery Section

Categories:

Campus

Events

Sports

Competitions

Annual Day

Celebrations
20. Testimonials

Include:

Parent Reviews

Student Success Stories
21. Admissions Page

Structure:

Why Join Us

Admission Process

Required Documents

Inquiry Form

WhatsApp CTA
22. Contact Page

Include:

Address

Google Maps

Phone

Email

Contact Form
23. Performance Rules

Always:

next/image

Lazy Loading

WebP

AVIF

Code Splitting

Optimized Fonts

Never:

Huge PNGs

Unoptimized Videos

Heavy Libraries
24. Accessibility Rules

Must Have:

ARIA Labels

Keyboard Navigation

Focus States

Alt Text

Semantic HTML
25. Folder Structure
src/

app/[locale]

components/
  layout/
  sections/
  ui/

data/

lib/

hooks/

types/

styles/

constants/

providers/

messages/

i18n/
26. Development Workflow

Phase 1

Theme Setup

Fonts

Localization

Navbar

Footer

Phase 2

Hero

Stats

Why Choose Us

Principal Message

Phase 3

Academics

Facilities

Gallery

Testimonials

Phase 4

Admissions CTA

Internal Pages

Phase 5

SEO

Metadata

Performance Optimization
27. Future Expansion

Version 2

PostgreSQL

Cloudinary

Admin Dashboard

Events CMS

Gallery CMS

Admission Management
28. Final Project Goal

Create a website that is:

Faster than SchoolDemo

More Modern than SchoolDemo

More Mobile Friendly than SchoolDemo

More SEO Friendly than SchoolDemo

More Trustworthy than SchoolDemo

More Premium than SchoolDemo

and capable of becoming the primary digital identity of Narayanleela English Medium School for admissions, branding, communication, and future growth.