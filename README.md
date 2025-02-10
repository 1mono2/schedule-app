# Schedule App

## Overview
A scheduling application featuring Google and Microsoft login authentication, calendar integration, 
multi-organization membership, complex scheduling condition settings, and API/Webhook integration capabilities.

## Getting Started

### Prerequisites

1. Install [Bun](https://bun.sh) as the package manager
2. Node.js 18.0.0 or higher is required
3. Docker Desktop for Supabase local development
4. Google Cloud Console account for OAuth setup
5. Microsoft Azure account for OAuth setup (optional)

### Initial Setup

1. **Supabase and Docker Setup**
   - Install Docker Desktop from https://www.docker.com/products/docker-desktop
   - Install Supabase CLI:
     ```bash
     bun install supabase --global
     ```
     
     For other installation methods, please check [this link](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=macos&queryGroups=access-method&access-method=postgres)
   - Start Supabase services:
     ```bash
     supabase start
     ```
   - Note: This will set up a local PostgreSQL database through Supabase

   - Run database migrations:
     ```bash
     # Create a new migration file which is created by drizzle-kit
     bun run db:generate

     # Apply all pending migrations
     supabase migration up
     ```
   - Note: Migration files are stored in the `supabase/migrations` directory

2. **Authentication Setup**
   - Go to Google Cloud Console
   - Create a new project
   - Enable the Google+ API
   - Create OAuth 2.0 credentials (Web application type)
   - Add `http://localhost:3000` to Authorized JavaScript origins
   - Add `http://localhost:3000/api/auth/callback/google` to Authorized redirect URIs
   - Save your Google OAuth Client ID and Client Secret

3. **Environment Setup**
   - Copy the sample environment file:
     ```bash
     cp .env.sample .env.local
     ```
   - Generate AUTH_SECRET:
     ```bash
     bunx auth secret
     ```
   - Update the following in `.env.local`:
     - `NODE_ENV`: Set to "development"
     - `PORT`: Default is 3000
     - `AUTH_SECRET`: Paste the generated secret from `bunx auth secret`
     - `AUTH_GOOGLE_ID`: Your Google OAuth Client ID
     - `AUTH_GOOGLE_SECRET`: Your Google OAuth Client Secret
     - `AUTH_MICROSOFT_ID`: (Optional) Your Microsoft Azure Application ID
     - `AUTH_MICROSOFT_SECRET`: (Optional) Your Microsoft Azure Client Secret

### Installation and Development

1. Install dependencies:
```bash
bun install
```

2. Run the development server:
```bash
bun dev  # Uses turbopack for faster development
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Commands

```bash
bun dev          # Start development server with turbopack
bun run build    # Create production build
bun start        # Start production server
bun run lint     # Run Biome.js for code linting
bun run format   # Run Biome.js for code linting & formatting
```

### Project Structure

```
schedule-app/
├── app/                # Next.js app directory (pages and components)
├── components/         # shadcn/ui components
├── docs/               # Project documentation for LLM(AI Agent)
│   └── guidelines/     # Guidelines for LLM(AI Agent) ex: coding standards, best practices, etc.
│   └── requirements/   # Requirements
└──  public/            # Static files
```

### Tech Stack

- **Frontend**: Next.js with shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google and Microsoft OAuth
- **Runtime**: Bun
- **API**: Hono serverless functions

### Troubleshooting

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check POSTGRES_URL format in .env.local
   - Ensure database exists and is accessible

2. **Authentication Issues**
   - Verify Google OAuth credentials
   - Check redirect URIs in Google Console
   - Ensure AUTH_SECRET is properly set

3. **Development Server Issues**
   - Clear .next directory: `rm -rf .next`
   - Reinstall dependencies: `bun install`
   - Check Node.js version (18.0.0+)