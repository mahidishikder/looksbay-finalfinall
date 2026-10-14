# Looksbay Studio

A five-page Next.js website for an independent Squarespace design studio. Built with the Next.js App Router, React, TypeScript, and Lucide icons.

Styling uses Tailwind CSS utility classes in component `className` attributes. `tailwind.config.ts` defines the shared palette, Apple-style system font stack, and `mobile`/`tablet` breakpoints; `app/globals.css` is only the Tailwind entry point and small global base layer.

## Getting started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Run `npm run typecheck` for the TypeScript check and `npm run build` to prepare a production build.

## Pages

- `/` — studio introduction, featured templates, services, and project process
- `/templates` — searchable and filterable template marketplace with live previews and FAQs
- `/services` — service packages and an interactive project-estimate tool
- `/portfolio` — filterable studio-concept gallery
- `/contact` — project inquiry form and discovery-call booking

## Code organization

- `app/(home)/page.tsx` composes the homepage sections. The `(home)` route group keeps the public URL at `/`.
- `app/(home)/components/` contains homepage-only section components; shared site components stay in `app/shared/components/site-components.tsx`.
- `app/(home)/data.ts` holds homepage-specific content such as portfolio cards, FAQs, and articles.
- `app/(pages)/templates/`, `services/`, `portfolio/`, and `contact/` each contain that page's `page.tsx`, `components/`, and page-specific data where needed. The `(pages)` route group keeps the public URLs unchanged.
- `app/shared/components/` contains UI reused across pages, and `app/shared/data/` contains shared content such as the service catalogue.

When adding a page-specific feature, keep its route, components, and data in that page's folder. Put UI or content in `app/shared/` only when it is genuinely reused by multiple pages. For the homepage, create or extend a focused component in `app/(home)/components/` and compose it from `app/(home)/page.tsx`.

## Before launch

Update the studio email and social links in `app/shared/components/site-components.tsx`, `app/(pages)/contact/components/inquiry-form.tsx`, and `app/(pages)/contact/page.tsx`. Inquiry submissions use a `mailto:` link; connect an email-form provider to accept submissions directly. Template prices and service estimates are examples, and template selection currently starts an inquiry rather than collecting payment; connect a payment provider before offering checkout. Portfolio cards are labeled sample studio concepts, not commissioned client work. The remote editorial images are served by Unsplash.
# looksbay-finalfinall