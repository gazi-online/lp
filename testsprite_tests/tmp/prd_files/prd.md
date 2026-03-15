# GaziOnline – Product Requirements Document

## Overview
GaziOnline is a Bengali-language digital services platform that provides citizens with easy access to government ID services (PAN card), banking utilities, and application tracking. Built with Next.js, React 19, Tailwind CSS v4, and Framer Motion.

## Goals
- Allow citizens to apply for PAN cards through a user-friendly modal form
- Allow citizens to track the status of their submitted applications
- Provide an admin dashboard (Nexus Command) to manage services, citizens, finances, fleet, logistics, marketplace, AI, risk, and workforce

## Features

### 1. Homepage
- Hero section with Bengali headings, animated stats panel, and two CTA buttons that open the PAN application modal
- Service Bento Grid displaying all available services from the SERVICE_CATALOG
- PAN Application Workflow section explaining the application process
- Trust & Assurance section with credibility indicators
- Footer with links to Privacy and Terms pages

### 2. PAN Application Modal
- Multi-field form for PAN card application
- Form validation via React Hook Form and Zod
- Open via hero CTA buttons or service card "Apply" button
- Close via close button or backdrop click

### 3. Application Status Tracking (/track)
- Input field for entering an application or tracking ID
- Display status of the submitted application

### 4. Admin Dashboard – Nexus Command (/admin)
- Sidebar navigation with modules: Services, Citizens, Finances, Fleet, Logistics, Marketplace, AI, Risk, Workforce
- Each module displays relevant data and CRUD controls (UI-only, not connected to backend)
- Access via "Nexus Command" button in the header

### 5. Navigation
- Fixed header with brand logo, nav links, and admin access button
- Links: পরিষেবাসমূহ (Services), Track Status (/track), Nexus Command (/admin)

## Non-Functional Requirements
- Responsive design for desktop and mobile
- Glassmorphism UI with dark premium aesthetic
- Smooth animations via Framer Motion and GSAP
- Fast page loads via Next.js Turborepo build

## Known Limitations
- Admin CRUD operations are UI-only, not persisted to a backend
- Application tracking results may use mock/static data
