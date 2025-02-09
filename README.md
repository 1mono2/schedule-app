This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

1. Install [Bun](https://bun.sh) as the package manager
2. Node.js 18.0.0 or higher is required
3. PostgreSQL database (version 12 or higher)
4. Google Cloud Console account for OAuth setup

### Initial Setup

1. **PostgreSQL Setup**
   - Install PostgreSQL on your system
   - Create a new database for the application
   - Note down your connection string in format: `postgresql://user:password@localhost:5432/dbname`

2. **Google OAuth Setup**
   - Go to Google Cloud Console
   - Create a new project
   - Enable the Google+ API
   - Create OAuth 2.0 credentials (Web application type)
   - Add `http://localhost:3000` to Authorized JavaScript origins
   - Add `http://localhost:3000/api/auth/callback/google` to Authorized redirect URIs
   - Save your Client ID and Client Secret

3. **Supabase and Docker Setup**
   - Install Docker Desktop from https://www.docker.com/products/docker-desktop
   - Install Supabase CLI:
     ```bash
     bun install supabase --global
     ```
   - Start Supabase services:
     ```bash
     supabase start
     ```

4. **Environment Variables**
   - Copy the sample environment file:
     ```bash
     cp .env.sample .env.local
     ```
   - Generate AUTH_SECRET:
     ```bash
     bunx auth secrets
     ```
   - Update the following in `.env.local`:
     - `AUTH_SECRET`: Paste the generated secret from `bunx auth secrets`
     - `AUTH_GOOGLE_ID`: Your Google OAuth Client ID
     - `AUTH_GOOGLE_SECRET`: Your Google OAuth Client Secret

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
bun run lint     # Run ESLint for code linting
```

### Project Structure

```
schedule-app/
├── app/                # Next.js app directory (pages and components)
├── docs/              # Project documentation
├── public/            # Static files
├── .env.local         # Local environment variables (create this)
├── next.config.ts     # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── eslint.config.mjs  # ESLint configuration
└── tsconfig.json      # TypeScript configuration
```

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
