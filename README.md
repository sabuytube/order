# Market Order System

This is a simple purchase order management application built with Next.js App Router, Tailwind CSS, and MongoDB via Mongoose.

## Getting Started

1. Install dependencies (requires Node.js):

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in your environment variables.

3. Run the development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_BASE_URL=<your site url>
MONGO_URI=<your mongodb uri>
MONGO_DB_NAME=<your database name>
```

## Deployment

The project is configured for deployment on Vercel. Ensure your environment variables are set in the Vercel dashboard.
