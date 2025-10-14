# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

La Mafia Game is a social deduction mobile game where players complete missions to recruit others into their mafia. This is a **pnpm monorepo** with a Bun/Elysia backend, Expo/React Native mobile app, and shared TypeScript packages.

## Architecture

### Monorepo Structure
```
apps/backend/    - Bun + Elysia API with Prisma + Supabase
apps/mobile/     - Expo + React Native mobile app
packages/shared/ - Shared TypeScript types and utilities
```

### Key Architectural Patterns

**Backend (Layered Architecture):**
- `routes/` - Elysia route definitions only
- `controllers/` - HTTP request/response handling
- `services/` - Pure business logic (no HTTP)
- `middlewares/` - JWT auth, CORS, error handling
- Database via Prisma with singleton pattern in `config/database.ts`

**Mobile (Component-based):**
- `screens/` - Full screen components
- `components/` - Reusable UI components
- `services/` - API calls via Axios
- `hooks/` - React Query hooks for server state
- `context/` - React Context for client state

**Shared Package:**
- All TypeScript interfaces/types shared between backend and mobile
- Common utilities (formatDuration, generateGamePassword, etc.)
- Import via `@shared/*` path alias

### Data Flow
```
Mobile → API Service → Backend Route → Controller → Service → Prisma → Supabase
                                                        ↓
                                                   Shared Types
```

## Development Commands

### Initial Setup
```bash
pnpm install              # Install all workspace dependencies
pnpm prisma:generate      # Generate Prisma Client
pnpm prisma:migrate       # Run database migrations
```

### Development
```bash
pnpm dev                  # Start all apps in parallel
pnpm dev:backend          # Backend only (http://localhost:3000)
pnpm dev:mobile           # Mobile only (Expo dev server)
```

### Backend-Specific
```bash
cd apps/backend
bun run dev               # Dev server with hot reload
bun test                  # Run backend tests
bun run prisma:studio     # Open Prisma Studio GUI
bunx prisma migrate dev --name <name>  # Create new migration
```

### Mobile-Specific
```bash
cd apps/mobile
npm start                 # Start Expo dev server
npm run android           # Run on Android (or press 'a' in Expo)
npm run ios               # Run on iOS (or press 'i' in Expo)
npm run web               # Run in web browser
```

### Database
```bash
pnpm prisma:studio        # Visual database browser
pnpm prisma:migrate       # Apply migrations
cd apps/backend && bunx prisma migrate reset  # Reset DB (destructive)
```

## Important Technical Details

### Runtime & Package Managers
- **Backend uses Bun** - Not Node.js. Use `bun` commands, not `npm`/`node`
- **Mobile uses npm** - Expo generates `package-lock.json` (not `pnpm-lock.yaml`)
- **Root uses pnpm** - For workspace management

### Path Aliases
Both backend and mobile use path aliases:
- `@/*` - Resolves to `./src/*`
- `@shared/*` - Resolves to `../../packages/shared/src/*`

Mobile requires `babel-plugin-module-resolver` configured in `babel.config.js`.

### Database Schema (Prisma)

**Core Models:**
- `User` - Authentication via Google OAuth, premium status, purchased rerolls
- `Game` - Duration in seconds, password-protected, selectedCategories array
- `Player` - Links User to Game, has targetId (another Player), actionId (Challenge)
- `Mafia` - Group of players, leaderId, game association
- `Challenge` - Bilingual (textEs, textEn), belongs to Category
- `Category` - Free vs paid (isFree, price), bilingual names

**Critical Relationships:**
- Player.target → Player (self-referential, who is hunting whom)
- Player.mafia → Mafia (group membership)
- Player.action → Challenge (assigned mission)
- Mafia.members → Player[] (all members)

**Enums:**
- `GameStatus`: SETUP → READY → ACTIVE → FINISHED
- `RecruitmentStatus`: NONE → PENDING → CONFIRMED/DENIED
- `ChallengeStatus`: PENDING → ACTIVE/REJECTED/ARCHIVED

### Game Mechanics (from requirements.md)

**Target Assignment Rules:**
- No player assigned to themselves
- No mutual targeting (A→B means B→A is forbidden)
- Creates a valid chain across all players

**Mafia Recruitment:**
- When Player A recruits Player B, B joins "Mafia A"
- If A is recruited by C, entire "Mafia A" (A + B + ...) joins "Mafia C"
- Mafia absorption is recursive
- Players remain vulnerable after recruiting others

**Mission Reroll:**
- 2 free rerolls per game (via watching 30s ads)
- Additional rerolls purchasable (€0.50 each)
- Premium users get 2 permanent rerolls per game
- Previously assigned missions tracked in Player.previousActions[]

**Victory Conditions:**
- Time expires: Largest mafia wins
- Total domination: One mafia has all players before time expires

### Environment Variables

**Backend (.env):**
```
DATABASE_URL          # Supabase PostgreSQL connection string
JWT_SECRET           # For signing JWTs
GOOGLE_CLIENT_ID     # Google OAuth web client
GOOGLE_CLIENT_SECRET # Google OAuth secret
PORT                 # Default 3000
CORS_ORIGIN          # Comma-separated allowed origins
```

**Mobile (.env):**
```
API_URL                    # Backend URL (use IP for physical devices)
GOOGLE_CLIENT_ID_IOS       # Google OAuth iOS client
GOOGLE_CLIENT_ID_ANDROID   # Google OAuth Android client
```

### API Documentation

Backend exposes Swagger docs at `http://localhost:3000/swagger` when running.

## Development Workflow

When implementing a new feature:
1. Define types in `packages/shared/src/types/`
2. Update Prisma schema in `apps/backend/prisma/schema.prisma` if needed
3. Run `pnpm prisma:generate` and create migration
4. Implement service logic in `apps/backend/src/services/`
5. Create controller in `apps/backend/src/controllers/`
6. Define route in `apps/backend/src/routes/`
7. Create API service in `apps/mobile/src/services/`
8. Implement React Query hook in `apps/mobile/src/hooks/`
9. Build UI components in `apps/mobile/src/components/`
10. Create screen in `apps/mobile/src/screens/`

## File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `GameCard.tsx`)
- Services: `camelCase.service.ts` (e.g., `game.service.ts`)
- Controllers: `camelCase.controller.ts` (e.g., `game.controller.ts`)
- Hooks: `useCamelCase.ts` (e.g., `useGame.ts`)
- Tests: `filename.test.ts`

## Testing

```bash
pnpm test              # Run all tests
cd apps/backend && bun test      # Backend tests only
cd apps/mobile && npm test       # Mobile tests only
```

Backend uses Bun's built-in test runner. Mobile uses Jest.

## Google OAuth Setup

Requires three OAuth clients in Google Cloud Console:
1. **Web** - For backend API (redirect: `http://localhost:3000/auth/google/callback`)
2. **iOS** - Bundle ID: `com.lamafiaGame.app`
3. **Android** - Package: `com.lamafiaGame.app` (needs SHA-1 fingerprint)

## Common Issues

**"Cannot find module '@prisma/client'"**: Run `pnpm prisma:generate`

**Port 3000 in use**: Change `PORT` in `apps/backend/.env`

**Mobile can't reach backend**: Use local IP instead of localhost in mobile `.env`:
```
API_URL=http://192.168.1.x:3000
```

**Module resolution errors in mobile**: Ensure `babel-plugin-module-resolver` is installed and `babel.config.js` has alias configuration

## Key Documentation Files

- `requirements.md` - Complete Gherkin acceptance criteria for all features
- `SETUP.md` - Detailed setup instructions with Google OAuth and Supabase config
- `docs/PROJECT_STRUCTURE.md` - Detailed directory structure explanation
- `apps/backend/README.md` - Backend-specific documentation
- `apps/mobile/README.md` - Mobile-specific documentation
