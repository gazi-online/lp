# 🛠 Maintenance Runbook - Gazi Online

This document outlines the maintenance procedures and support guidelines for the Gazi Online platform.

## 🔍 Monitoring
- **Logs**: Error logs can be found in the Vercel/Production console. Use `src/lib/logger.ts` to add custom event tracking.
- **Performance**: Periodically run Lighthouse audits to ensure the performance score remains above 90.

## 📋 Standard Procedures

### 1. Updating Services
To add or modify services in the Bento Grid:
1. Open `src/components/ServiceBentoGrid.tsx`.
2. Update the `services` constant array.
3. Ensure icons are imported from `lucide-react`.

### 2. Form Validation Changes
To modify the PAN application form:
1. Open `src/components/PanApplicationModal.tsx`.
2. Update the `formSchema` using Zod.
3. Update the UI inputs accordingly.

### 3. SEO Updates
To update business hours or contact info for Google Search:
1. Open `src/app/layout.tsx`.
2. Locate the `JSON.stringify` block containing `@type: LocalBusiness`.
3. Update specific fields (`telephone`, `openingHours`, etc.).

## 🔐 Security
- **Data Purge**: Remind staff that client documents (Aadhaar/Photos) should be deleted after 90 days.
- **Environment Variables**: Never commit `.env.local` to the git repository.

## 📞 Support
- **Developer**: Antigravity AI
- **Business Contact**: info@gazionline.com
