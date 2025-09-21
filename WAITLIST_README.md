# Waitlist Implementation

This project implements a modern waitlist system using Next.js 15 App Router best practices.

## Features

- ✅ Server Actions for form handling (no API routes)
- ✅ React Hook Form with Zod validation
- ✅ Prisma ORM with PostgreSQL
- ✅ Real-time waitlist statistics
- ✅ Toast notifications with Sonner
- ✅ Responsive UI with Tailwind CSS
- ✅ TypeScript for type safety

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/raine_db"

# Waitlist Configuration
IS_WAITLIST="true"
NEXT_PUBLIC_APP_SLUG="raine"
```

## Database Setup

1. Run Prisma migrations:
```bash
npx prisma migrate dev
```

2. Generate Prisma client:
```bash
npx prisma generate
```

## How It Works

### Server Actions (`/src/actions/waitlist.ts`)
- `createWaitlistEntryAction`: Handles form submission with validation
- `getWaitlistStatsAction`: Fetches waitlist statistics

### Components (`/src/components/waitlist.tsx`)
- Client component with React Hook Form
- Real-time form validation with Zod
- Toast notifications for user feedback
- Loading states with React transitions

### Page Logic (`/src/app/page.tsx`)
- Server component that conditionally renders waitlist or main page
- Fetches waitlist stats on server side
- Uses environment variable to toggle waitlist mode

## Database Schema

The waitlist uses a simple but effective schema:

```prisma
model WaitlistEntry {
  id String @id @default(cuid())
  name String
  email String
  appSlug String
  position Int @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([email, appSlug])
  @@index([appSlug, position])
}
```

## Key Benefits

1. **No API Routes**: Uses Server Actions for better performance
2. **Type Safety**: Full TypeScript coverage with Zod validation
3. **Real-time Stats**: Shows total entries and recent signups
4. **Duplicate Prevention**: Unique constraint prevents duplicate emails per app
5. **Position Tracking**: Automatic position assignment for waitlist entries
6. **Error Handling**: Comprehensive error handling with user-friendly messages

## Usage

To enable waitlist mode, set `IS_WAITLIST="true"` in your environment variables. The app will automatically show the waitlist page instead of the main page.

The waitlist form includes:
- Name (optional)
- Email (required)
- Real-time validation
- Success/error feedback
- Position confirmation
