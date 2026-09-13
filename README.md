# CredMate

> **AI-powered credit health intelligence and debt advisory platform.**  
> Turn complex CIBIL and credit report PDFs into actionable score breakdowns, risk evaluations, and personalized AI-driven financial roadmaps.

---

## Architecture and Flow

```mermaid
flowchart TD
    subgraph Client ["Client (Next.js Dashboard)"]
        A[Upload CIBIL PDF] --> B[View Metrics and Summary]
        B --> C[Interactive AI Chat]
    end

    subgraph Server ["Next.js Backend and API Routes"]
        D["/api/analyze"]
        E["/api/chat"]
        F["Session and Auth Boundary (Auth.js)"]
    end

    subgraph AI ["Gemini AI Engine"]
        G[Gemini 2.5 Flash: PDF Extraction]
        H[Gemini 2.5 Flash: Contextual Q&A]
    end

    subgraph Data ["Database (PostgreSQL and Prisma)"]
        I[(User Profile)]
        J[(Reports and Extracted Metrics)]
        K[(Chat Conversations and History)]
    end

    %% Upload Flow
    A -->|1. Multipart PDF| F
    F --> D
    D -->|2. Buffer stream| G
    G -->|3. Score, Risk, Utilization and Summary| D
    D -->|4. Persist Report Data| J
    J -->|5. Return Analysis DTO| B

    %% Chat Flow
    C -->|6. Ask Question| F
    F --> E
    E -->|7. Fetch Report Context and History| J & K
    E -->|8. Prompt with Report Context| H
    H -->|9. AI Recommendation| E
    E -->|10. Store Message and Respond| K
    K -->|11. Render Answer in Chat| C
```

---

## Key Features

- **Deep CIBIL Report Extraction**: Upload PDF credit reports to instantly extract credit score, score range, debt utilization, and overall risk tier.
- **Context-Aware AI Assistant**: Ask questions about your report in plain English (for example, *"How can I improve my score by 50 points?"*, *"Which loan should I pay off first?"*).
- **Dynamic Metric Dashboards**: Clean visualization of your credit profile, debt ratio, and risk assessment with real-time feedback.
- **Multi-Session Report History**: Persist past reports and associated AI conversations seamlessly across logins.
- **Secure and Private**: Enterprise-grade session handling with Auth.js and encrypted database connections.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) and [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), Radix UI Primitives, Lucide Icons |
| **AI / LLM** | [Google Gemini 2.5 Flash](https://ai.google.dev/) (`@google/genai`) |
| **Database and ORM** | [PostgreSQL](https://www.postgresql.org/) (Neon / Supabase), [Prisma ORM 7](https://www.prisma.io/) |
| **Authentication** | [Auth.js (NextAuth v5)](https://authjs.dev/) with Google OAuth Provider |

---

## Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **PostgreSQL**: Local instance or cloud database (such as Neon or Supabase)
- **Google Gemini API Key**: [Google AI Studio](https://aistudio.google.com/)

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```env
# App
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret_key"

# Database
DATABASE_URL="postgresql://user:password@host:port/credmate?sslmode=require"

# Google OAuth
AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"

# Gemini AI
GEMINI_API_KEY="your_gemini_api_key"
```

### 3. Install and Run

```bash
# Install dependencies
npm install

# Generate Prisma Client and push schema to database
npm run prisma:generate
npx prisma db push

# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Project Structure

```text
src/
├── app/                  # Next.js App Router (pages, layouts, API routes)
│   ├── (public)/         # Landing page and public routes
│   ├── api/              # /analyze, /chat, /reports API endpoints
│   └── dashboard/        # Authenticated dashboard and report views
├── components/           # UI components (dashboard, landing, shared)
├── modules/              # Domain-driven feature modules
│   ├── ai/               # Gemini AI client, prompts, and analysis services
│   ├── auth/             # Authentication services and session management
│   ├── reports/          # Report processing, DTOs, and repositories
│   └── users/            # User repositories and account syncing
└── shared/               # Cross-cutting concerns (DB Prisma client, errors, config)
```

---

## License

This project is licensed under the MIT License.
