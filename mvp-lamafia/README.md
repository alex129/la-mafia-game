# La Mafia Game - MVP

A social deduction mobile game where players complete missions to recruit others into their mafia.

## 🏗️ Project Structure

This is a pnpm monorepo with the following structure:

```
mvp-lamafia/
├── apps/
│   ├── backend/        # Backend API (Bun + Elysia + Prisma + Supabase)
│   └── mobile/         # Mobile App (Expo + React Native)
├── packages/
│   └── shared/         # Shared types and utilities
└── docs/               # Documentation
```

## 🚀 Tech Stack

### Backend
- **Runtime:** [Bun](https://bun.sh/) - Fast JavaScript runtime
- **Framework:** [Elysia](https://elysiajs.com/) - High-performance web framework for Bun
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Auth:** Google OAuth 2.0 + JWT

### Mobile
- **Framework:** [Expo](https://expo.dev/) (React Native)
- **Navigation:** React Navigation
- **State:** Context API + React Query
- **UI:** React Native Paper

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Bun** >= 1.0.0 (for backend development)
- **Expo CLI** (installed automatically)

## 🛠️ Getting Started

### 1. Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
# Root
cp .env.example .env

# Backend
cd apps/backend
cp .env.example .env
# Edit .env with your Supabase and Google OAuth credentials

# Mobile
cd apps/mobile
cp .env.example .env
# Edit .env with your API URL and Google OAuth credentials
```

### 4. Set up the database

```bash
# Generate Prisma Client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate

# (Optional) Seed the database
cd apps/backend
bun run prisma:seed
```

### 5. Start development servers

```bash
# Start all apps in parallel
pnpm dev

# Or start individually
pnpm dev:backend    # Backend on http://localhost:3000
pnpm dev:mobile     # Mobile app with Expo
```

## 📱 Mobile Development

```bash
# Start Expo dev server
pnpm dev:mobile

# Run on Android
cd apps/mobile && pnpm android

# Run on iOS
cd apps/mobile && pnpm ios

# Run on Web
cd apps/mobile && pnpm web
```

## 🗄️ Database Management

```bash
# Open Prisma Studio (Database GUI)
pnpm prisma:studio

# Create a new migration
pnpm prisma:migrate

# Reset database (⚠️ Deletes all data)
cd apps/backend && bunx prisma migrate reset
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Test backend only
cd apps/backend && bun test

# Test mobile only
cd apps/mobile && pnpm test
```

## 📦 Building

```bash
# Build all apps
pnpm build

# Build backend only
pnpm build:backend

# Build mobile only
pnpm build:mobile
```

## 🔧 Useful Commands

```bash
# Clean all node_modules and build artifacts
pnpm clean

# Lint all packages
pnpm lint

# View API documentation
# Start backend and visit http://localhost:3000/swagger
```

## 📚 Documentation

- [Requirements](./requirements.md) - Full Gherkin acceptance criteria
- [API Documentation](./docs/api.md) - API endpoints and usage
- Backend: `apps/backend/README.md`
- Mobile: `apps/mobile/README.md`

## 🏛️ Architecture

### Backend Architecture
```
apps/backend/src/
├── config/         # Configuration (DB, auth)
├── routes/         # API routes
├── controllers/    # Request handlers
├── services/       # Business logic
├── middlewares/    # Auth, CORS, etc.
├── utils/          # Helper functions
└── types/          # TypeScript types
```

### Mobile Architecture
```
apps/mobile/src/
├── screens/        # Screen components
├── components/     # Reusable components
├── navigation/     # Navigation config
├── services/       # API calls
├── hooks/          # Custom hooks
├── context/        # React Context
├── utils/          # Helper functions
└── types/          # TypeScript types
```

## 🔐 Environment Variables

### Backend Required Variables
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

### Mobile Required Variables
- `API_URL` - Backend API URL
- `GOOGLE_CLIENT_ID_IOS` - Google OAuth client ID for iOS
- `GOOGLE_CLIENT_ID_ANDROID` - Google OAuth client ID for Android

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test your changes
4. Submit a pull request

## 📄 License

MIT

## 👥 Team

La Mafia Game Development Team
