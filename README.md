# Better Auth Implementation

A production-ready Next.js 15 authentication system using Better Auth, featuring email/password auth, password reset flows, and email verification.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: Better Auth
- **Database**: Neon PostgreSQL + Drizzle ORM
- **Email**: Resend + React Email
- **Styling**: Tailwind CSS
- **Validation**: Zod

## Features

- ✅ Email/Password Authentication
- ✅ Password Reset Flow (with email)
- ✅ Email Verification
- ✅ Protected Routes
- ✅ Session Management
- ✅ Type-safe Database Schema
- ✅ Responsive UI

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/shehroztariq-dev/better-auth.git
cd better-auth
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL=your_neon_postgres_url

# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Resend (Email)
RESEND_API_KEY=your_resend_api_key
```

### 3. Setup Database

```bash
npm run db:push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── dashboard/          # Protected route
│   └── api/auth/           # Better Auth API routes
├── lib/
│   ├── auth.ts             # Better Auth config
│   ├── auth-client.ts      # Client-side auth
│   └── db.ts               # Drizzle setup
├── emails/
│   └── reset-password.tsx  # Email templates
└── db/
    └── schema.ts           # Database schema
```

## Key Routes

- `/sign-in` - Login
- `/sign-up` - Registration
- `/forgot-password` - Request password reset
- `/reset-password` - Reset password with token
- `/dashboard` - Protected dashboard

## Email Configuration

This project uses **Resend** for transactional emails. You need to:

1. Sign up at [resend.com](https://resend.com)
2. Verify your sending domain
3. Add your API key to `.env.local`

## Database Schema

Uses Better Auth's default tables:

- `user` - User accounts
- `session` - Active sessions
- `verification` - Email verification tokens
- `account` - OAuth providers (future)

## Environment Requirements

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Resend account for emails

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

## License

MIT

## Author

**Shehroz Tariq**  
[GitHub](https://github.com/shehroztariq-dev)

---

Built with ❤️ using Next.js 16 and Better Auth
