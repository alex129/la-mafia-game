# Backend - La Mafia Game API

Backend API built with Bun, Elysia, Prisma, and Supabase.

## 🚀 Quick Start

```bash
# Install dependencies
cd apps/backend
bun install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma Client
bun run prisma:generate

# Run migrations
bun run prisma:migrate

# Start development server
bun run dev
```

The server will start at http://localhost:3000
Swagger docs at http://localhost:3000/swagger

## 📁 Structure

```
src/
├── config/       # Configuration (database, auth)
├── routes/       # API route definitions
├── controllers/  # Request handlers
├── services/     # Business logic
├── middlewares/  # Auth, CORS, error handling
├── utils/        # Helper functions
└── types/        # TypeScript types
```

## 🔧 Available Commands

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun test` - Run tests
- `bun run prisma:generate` - Generate Prisma Client
- `bun run prisma:migrate` - Run database migrations
- `bun run prisma:studio` - Open Prisma Studio
- `bun run prisma:seed` - Seed the database

## 🗄️ Database

The project uses Prisma with PostgreSQL (Supabase).

### Models

- **User** - User accounts and authentication
- **Game** - Game sessions
- **Player** - Players in games
- **Mafia** - Mafia groups
- **Challenge** - Missions/challenges
- **Category** - Challenge categories
- **Feedback** - User feedback
- **Purchase** - In-app purchases

### Migrations

```bash
# Create a new migration
bun run prisma:migrate

# View data
bun run prisma:studio
```

## 🔐 Authentication

Uses JWT with Google OAuth 2.0.

Environment variables needed:
- `JWT_SECRET` - Secret for JWT signing
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

## 📚 API Documentation

Once the server is running, visit `/swagger` for interactive API documentation.

## 🧪 Testing

```bash
bun test
```

## 🐛 Debugging

Set `NODE_ENV=development` in `.env` to enable:
- Detailed error messages
- Query logging
- Hot reload

## 📝 Code Style

- Use TypeScript for all files
- Use async/await over promises
- Use Zod for validation
- Follow ESLint rules
