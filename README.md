# CredMate

CredMate is a Next.js application for analyzing CIBIL reports and answering
credit-health questions with Gemini.

## Architecture

This project is a modular layered monolith:

app routes → module services → repositories / AI adapters → external systems

- src/app contains pages, layouts, and thin API route handlers.
- src/modules/auth owns authentication actions and session boundaries.
- src/modules/reports owns report validation, analysis, chat workflows, DTOs,
  and repository contracts.
- src/modules/ai owns Gemini client setup, prompts, response parsing, and
  AI-facing services.
- src/modules/users owns user contracts and user-facing services.
- src/shared contains cross-cutting infrastructure such as Prisma, server
  configuration, error handling, and utilities.
- src/components contains presentation components.

The current report repository is an interface only: analysis is still
ephemeral and is not persisted until Prisma models and repository
implementations are added.

Prisma Client is generated into src/generated/prisma. Run npm run prisma:generate
after changing the Prisma schema; production builds run this automatically.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
