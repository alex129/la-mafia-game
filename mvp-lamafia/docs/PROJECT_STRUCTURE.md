# Project Structure - La Mafia Game

## 📁 Complete Directory Structure

```
mvp-lamafia/
│
├── 📄 package.json                 # Root package with workspace scripts
├── 📄 pnpm-workspace.yaml          # pnpm workspace configuration
├── 📄 .gitignore                   # Git ignore rules
├── 📄 .env.example                 # Environment variables template
├── 📄 README.md                    # Main documentation
├── 📄 SETUP.md                     # Setup guide
├── 📄 requirements.md              # Gherkin acceptance criteria
│
├── 📁 apps/
│   │
│   ├── 📁 backend/                 # Backend API (Bun + Elysia)
│   │   ├── 📄 package.json         # Backend dependencies
│   │   ├── 📄 tsconfig.json        # TypeScript config
│   │   ├── 📄 .env.example         # Backend env template
│   │   │
│   │   ├── 📁 prisma/
│   │   │   ├── 📄 schema.prisma    # Database schema
│   │   │   └── 📁 migrations/      # Database migrations
│   │   │
│   │   ├── 📁 src/
│   │   │   ├── 📄 index.ts         # Entry point
│   │   │   │
│   │   │   ├── 📁 config/          # Configuration files
│   │   │   │   ├── 📄 database.ts  # DB connection
│   │   │   │   ├── 📄 auth.ts      # Auth config
│   │   │   │   └── 📄 env.ts       # Environment variables
│   │   │   │
│   │   │   ├── 📁 routes/          # API routes
│   │   │   │   ├── 📄 auth.ts      # Auth endpoints
│   │   │   │   ├── 📄 game.ts      # Game endpoints
│   │   │   │   ├── 📄 player.ts    # Player endpoints
│   │   │   │   ├── 📄 challenge.ts # Challenge endpoints
│   │   │   │   └── 📄 mafia.ts     # Mafia endpoints
│   │   │   │
│   │   │   ├── 📁 controllers/     # Request handlers
│   │   │   │   ├── 📄 auth.controller.ts
│   │   │   │   ├── 📄 game.controller.ts
│   │   │   │   ├── 📄 player.controller.ts
│   │   │   │   ├── 📄 challenge.controller.ts
│   │   │   │   └── 📄 mafia.controller.ts
│   │   │   │
│   │   │   ├── 📁 services/        # Business logic
│   │   │   │   ├── 📄 auth.service.ts
│   │   │   │   ├── 📄 game.service.ts
│   │   │   │   ├── 📄 player.service.ts
│   │   │   │   ├── 📄 challenge.service.ts
│   │   │   │   ├── 📄 mafia.service.ts
│   │   │   │   ├── 📄 assignment.service.ts  # Target/mission assignment
│   │   │   │   └── 📄 recruitment.service.ts # Recruitment logic
│   │   │   │
│   │   │   ├── 📁 middlewares/     # Middleware functions
│   │   │   │   ├── 📄 auth.ts      # JWT verification
│   │   │   │   ├── 📄 cors.ts      # CORS config
│   │   │   │   └── 📄 error.ts     # Error handling
│   │   │   │
│   │   │   ├── 📁 utils/           # Helper functions
│   │   │   │   ├── 📄 password.ts  # Password generation
│   │   │   │   ├── 📄 token.ts     # JWT helpers
│   │   │   │   └── 📄 validation.ts # Input validation
│   │   │   │
│   │   │   └── 📁 types/           # TypeScript types
│   │   │       ├── 📄 index.ts
│   │   │       └── 📄 request.ts   # Request/Response types
│   │   │
│   │   └── 📁 tests/               # Backend tests
│   │       ├── 📄 auth.test.ts
│   │       └── 📄 game.test.ts
│   │
│   └── 📁 mobile/                  # Mobile App (Expo + React Native)
│       ├── 📄 package.json         # Mobile dependencies
│       ├── 📄 app.json             # Expo configuration
│       ├── 📄 tsconfig.json        # TypeScript config
│       ├── 📄 babel.config.js      # Babel config
│       ├── 📄 .env.example         # Mobile env template
│       ├── 📄 App.tsx              # Main app component
│       │
│       ├── 📁 src/
│       │   │
│       │   ├── 📁 screens/         # Screen components
│       │   │   ├── 📁 auth/
│       │   │   │   ├── 📄 LoginScreen.tsx
│       │   │   │   └── 📄 RegisterScreen.tsx
│       │   │   │
│       │   │   ├── 📁 game/
│       │   │   │   ├── 📄 GameListScreen.tsx
│       │   │   │   ├── 📄 CreateGameScreen.tsx
│       │   │   │   ├── 📄 JoinGameScreen.tsx
│       │   │   │   ├── 📄 GameDetailsScreen.tsx
│       │   │   │   └── 📄 GameResultsScreen.tsx
│       │   │   │
│       │   │   ├── 📁 player/
│       │   │   │   ├── 📄 MyMissionScreen.tsx
│       │   │   │   └── 📄 VerificationScreen.tsx
│       │   │   │
│       │   │   └── 📁 profile/
│       │   │       ├── 📄 ProfileScreen.tsx
│       │   │       └── 📄 SettingsScreen.tsx
│       │   │
│       │   ├── 📁 components/      # Reusable components
│       │   │   ├── 📁 ui/
│       │   │   │   ├── 📄 Button.tsx
│       │   │   │   ├── 📄 Card.tsx
│       │   │   │   ├── 📄 Input.tsx
│       │   │   │   └── 📄 Loading.tsx
│       │   │   │
│       │   │   ├── 📁 game/
│       │   │   │   ├── 📄 GameCard.tsx
│       │   │   │   ├── 📄 PlayerList.tsx
│       │   │   │   └── 📄 MafiaInfo.tsx
│       │   │   │
│       │   │   └── 📁 challenge/
│       │   │       ├── 📄 ChallengeCard.tsx
│       │   │       └── 📄 CategorySelector.tsx
│       │   │
│       │   ├── 📁 navigation/      # Navigation configuration
│       │   │   ├── 📄 index.tsx
│       │   │   ├── 📄 AuthNavigator.tsx
│       │   │   └── 📄 MainNavigator.tsx
│       │   │
│       │   ├── 📁 services/        # API calls
│       │   │   ├── 📄 api.ts       # Axios instance
│       │   │   ├── 📄 auth.service.ts
│       │   │   ├── 📄 game.service.ts
│       │   │   ├── 📄 player.service.ts
│       │   │   └── 📄 challenge.service.ts
│       │   │
│       │   ├── 📁 hooks/           # Custom React hooks
│       │   │   ├── 📄 useAuth.ts
│       │   │   ├── 📄 useGame.ts
│       │   │   └── 📄 useNotifications.ts
│       │   │
│       │   ├── 📁 context/         # React Context
│       │   │   ├── 📄 AuthContext.tsx
│       │   │   └── 📄 GameContext.tsx
│       │   │
│       │   ├── 📁 utils/           # Helper functions
│       │   │   ├── 📄 format.ts
│       │   │   └── 📄 storage.ts
│       │   │
│       │   └── 📁 types/           # TypeScript types
│       │       └── 📄 index.ts
│       │
│       └── 📁 assets/              # Static assets
│           ├── 🖼️ icon.png
│           ├── 🖼️ splash.png
│           └── 🖼️ adaptive-icon.png
│
├── 📁 packages/
│   └── 📁 shared/                  # Shared code
│       ├── 📄 package.json         # Shared dependencies
│       ├── 📄 tsconfig.json        # TypeScript config
│       │
│       └── 📁 src/
│           ├── 📄 index.ts         # Main export
│           │
│           ├── 📁 types/           # Shared TypeScript types
│           │   ├── 📄 index.ts
│           │   ├── 📄 user.ts      # User types
│           │   ├── 📄 game.ts      # Game types
│           │   ├── 📄 player.ts    # Player types
│           │   ├── 📄 challenge.ts # Challenge types
│           │   ├── 📄 mafia.ts     # Mafia types
│           │   └── 📄 api.ts       # API response types
│           │
│           └── 📁 utils/           # Shared utilities
│               └── 📄 index.ts     # Helper functions
│
└── 📁 docs/                        # Documentation
    ├── 📄 PROJECT_STRUCTURE.md     # This file
    ├── 📄 API.md                   # API documentation
    └── 📄 ARCHITECTURE.md          # Architecture decisions
```

## 🎯 Key Directories Explained

### Backend (`apps/backend`)

#### `src/routes/`
Define los endpoints de la API (GET, POST, PUT, DELETE).

**Ejemplo:**
```typescript
// routes/game.ts
app.get('/games', getGames)
app.post('/games', createGame)
app.get('/games/:id', getGameById)
```

#### `src/controllers/`
Maneja las peticiones HTTP y respuestas.

**Ejemplo:**
```typescript
// controllers/game.controller.ts
export const createGame = async (req, res) => {
  // Validar input
  // Llamar al service
  // Devolver respuesta
}
```

#### `src/services/`
Contiene la lógica de negocio pura.

**Ejemplo:**
```typescript
// services/game.service.ts
export const assignTargetsToPlayers = (players) => {
  // Lógica para asignar targets aleatoriamente
  // Sin código HTTP
}
```

#### `src/middlewares/`
Funciones que se ejecutan antes de los controladores.

**Ejemplo:**
```typescript
// middlewares/auth.ts
export const requireAuth = async (req, res, next) => {
  // Verificar JWT
  // Continuar o rechazar
}
```

### Mobile (`apps/mobile`)

#### `src/screens/`
Componentes que representan pantallas completas.

**Ejemplo:**
```typescript
// screens/game/GameListScreen.tsx
export const GameListScreen = () => {
  // Renderiza lista de juegos
}
```

#### `src/components/`
Componentes reutilizables.

**Ejemplo:**
```typescript
// components/game/GameCard.tsx
export const GameCard = ({ game }) => {
  // Renderiza un card de juego
}
```

#### `src/services/`
Funciones para llamar a la API.

**Ejemplo:**
```typescript
// services/game.service.ts
export const fetchGames = async () => {
  return api.get('/games')
}
```

#### `src/hooks/`
Custom React hooks para lógica reutilizable.

**Ejemplo:**
```typescript
// hooks/useGame.ts
export const useGame = (gameId) => {
  // React Query hook para fetch game
}
```

### Shared (`packages/shared`)

Código compartido entre backend y mobile:

- **Types:** Interfaces TypeScript
- **Utils:** Funciones helper (formatDuration, generatePassword, etc.)

## 📊 Data Flow

```
Mobile App → API Service → Backend Route → Controller → Service → Prisma → Database
                                                           ↓
                                                      Shared Types
```

## 🔄 Development Workflow

1. **Definir tipos** en `packages/shared/src/types/`
2. **Crear schema** en `apps/backend/prisma/schema.prisma`
3. **Implementar service** en `apps/backend/src/services/`
4. **Crear controlador** en `apps/backend/src/controllers/`
5. **Definir ruta** en `apps/backend/src/routes/`
6. **Crear API service** en `apps/mobile/src/services/`
7. **Implementar hook** en `apps/mobile/src/hooks/`
8. **Crear componentes** en `apps/mobile/src/components/`
9. **Construir pantalla** en `apps/mobile/src/screens/`

## 🧩 Module Dependencies

```
apps/mobile     →  packages/shared
                →  apps/backend (via API)

apps/backend    →  packages/shared
                →  Prisma Client
                →  Supabase

packages/shared →  (no dependencies)
```

## 📝 File Naming Conventions

- **Components:** PascalCase (`GameCard.tsx`)
- **Services:** camelCase with .service (`game.service.ts`)
- **Controllers:** camelCase with .controller (`game.controller.ts`)
- **Hooks:** camelCase starting with "use" (`useGame.ts`)
- **Types:** camelCase with .types (optional, or just `.ts`)
- **Tests:** Same name with .test (`game.test.ts`)

## 🎨 Code Organization Principles

### 1. Separation of Concerns
- Routes: Solo definición de endpoints
- Controllers: Solo manejo de HTTP
- Services: Solo lógica de negocio
- Middleware: Solo procesamiento intermedio

### 2. DRY (Don't Repeat Yourself)
- Types compartidos en `packages/shared`
- Utils reutilizables
- Componentes reutilizables

### 3. Single Responsibility
- Cada archivo tiene una única responsabilidad
- Funciones pequeñas y enfocadas

### 4. Dependency Injection
- Services reciben dependencias como parámetros
- Facilita testing y mantenimiento

## 🚀 Next Steps

1. Implementar autenticación con Google OAuth
2. Crear las rutas principales del backend
3. Desarrollar las pantallas básicas del mobile
4. Implementar la lógica de asignación de targets
5. Desarrollar el sistema de reclutamiento
6. Añadir notificaciones push
7. Implementar sistema de monetización
