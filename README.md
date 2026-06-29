# LuxArch | Premium Construction & Architecture Website

An enterprise-grade, luxury web application built with **Next.js 15 (App Router)**, **TypeScript**, **Prisma ORM**, **NextAuth**, **Framer Motion**, and **Tailwind CSS**.

---

## Technical Stack

- **Core Framework**: Next.js 15 (App Router)
- **Styling & UI**: Tailwind CSS v4, Framer Motion (premium animations)
- **Authentication**: NextAuth (role-based administration routing)
- **Database ORM**: Prisma ORM (configured for PostgreSQL)
- **Email Dispatch**: Nodemailer (integrated client contact inquiries)
- **Charts & Graphs**: Recharts (admin analytics dashboards)
- **Form Controls**: React Hook Form, Zod schema validation

---

## Features

- **Responsive Landing Page**: 18 luxury content sections (parallax hero slider, infinite marquee partners, masonry portfolios with filters, process timelines, before/after renovation sliders, animated count statistics, accordion FAQs, blog rolls, contact sheets, newsletter cards, and premium footers).
- **Security Middleware**: Edge-compatible route middleware protecting dashboard routes. Admins are redirected to `/admin/login`, and regular clients to `/login`.
- **Administrative Portal**: A hidden workspace at `/admin` offering analytics graphs, booking approvals, and CMS controls to update site-wide services.
- **Client Booking Dashboard**: Custom portal allowing clients to request inspection surveys, track ongoing build progress bars, check invoices, and trigger mock payments.
- **Dynamic SEO Optimization**: Automated metadata indexers, dynamic sitemap.xml files, robots.txt crawl directives, and open graph markup.

---

## Installation & Setup

### 1. Prerequisites
- Node.js version `20.x` or `22.x`
- Docker Desktop (to spin up the local database)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start PostgreSQL Database
A local database service is configured in the `docker-compose.yml` file. Run:
```bash
docker compose up -d
```

### 4. Setup Environment Variables
Copy `.env.example` to `.env` and fill in credentials:
```bash
cp .env.example .env
```

### 5. Apply Database Migrations & Seed Data
Initialize database schema tables and seed the luxury test items:
```bash
npx prisma db push
npx prisma db seed
```

### 6. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Seed Accounts

During database seeding, two administrative and client demo accounts are initialized:

- **Administrator Portal** (URL: `/admin`):
  - **Email**: `admin@company.com`
  - **Password**: `AdminPassword123!`
- **Client Portal** (URL: `/login`):
  - **Email**: `client@company.com`
  - **Password**: `ClientPassword123!`
