# Setup Guide - La Mafia Game

Esta guía explica cómo inicializar cada parte del proyecto desde cero usando los comandos oficiales.

## 📦 Instalación Inicial

### 1. Instalar pnpm globalmente (si no lo tienes)

```bash
npm install -g pnpm
```

### 2. Instalar Bun (para el backend)

```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"
```

## 🏗️ Inicializar Backend con Elysia

El backend ya está configurado manualmente para optimizar la estructura. Si quisieras crear uno desde cero:

```bash
cd apps
bun create elysia backend
```

Pero en este proyecto ya está configurado con:
- Estructura de carpetas optimizada
- Prisma integrado
- JWT y CORS configurados
- Swagger docs

## 📱 Inicializar Mobile App con Expo

La app móvil también está pre-configurada. Si quisieras crear una desde cero:

```bash
cd apps
npx create-expo-app@latest mobile
```

## 🚀 Pasos para Comenzar a Desarrollar

### 1. Instalar dependencias del monorepo

Desde la raíz del proyecto:

```bash
pnpm install
```

Esto instalará las dependencias de todos los workspaces (backend, mobile, shared).

### 2. Configurar variables de entorno

**Backend:**
```bash
cd apps/backend
cp .env.example .env
```

Edita `apps/backend/.env` con tus credenciales de Supabase y Google OAuth:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
GOOGLE_CLIENT_ID="tu-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="tu-secret"
JWT_SECRET="un-secret-muy-seguro"
```

**Mobile:**
```bash
cd apps/mobile
cp .env.example .env
```

Edita `apps/mobile/.env`:

```env
API_URL=http://localhost:3000
GOOGLE_CLIENT_ID_IOS=tu-ios-client-id
GOOGLE_CLIENT_ID_ANDROID=tu-android-client-id
```

### 3. Configurar la base de datos con Prisma

```bash
# Generar el cliente de Prisma
pnpm prisma:generate

# Crear y aplicar las migraciones
pnpm prisma:migrate

# (Opcional) Poblar la base de datos con datos de prueba
cd apps/backend
bun run prisma:seed
```

### 4. Iniciar los servidores de desarrollo

**Opción 1: Iniciar todo en paralelo**
```bash
pnpm dev
```

**Opción 2: Iniciar individualmente**

Terminal 1 - Backend:
```bash
pnpm dev:backend
# El servidor estará en http://localhost:3000
# Swagger docs en http://localhost:3000/swagger
```

Terminal 2 - Mobile:
```bash
pnpm dev:mobile
# Se abrirá Expo Dev Tools
```

## 📱 Ejecutar la App Móvil

Una vez que el servidor de Expo esté corriendo:

### Android
```bash
cd apps/mobile
pnpm android
# O presiona 'a' en la terminal de Expo
```

### iOS (Solo macOS)
```bash
cd apps/mobile
pnpm ios
# O presiona 'i' en la terminal de Expo
```

### Web
```bash
cd apps/mobile
pnpm web
# O presiona 'w' en la terminal de Expo
```

### Dispositivo físico
1. Instala "Expo Go" desde App Store o Google Play
2. Escanea el QR code que aparece en la terminal

## 🗄️ Gestión de Base de Datos

### Ver la base de datos con Prisma Studio

```bash
pnpm prisma:studio
```

Abre tu navegador en http://localhost:5555

### Crear una nueva migración

```bash
cd apps/backend

# 1. Modifica el schema en prisma/schema.prisma
# 2. Crea la migración
bunx prisma migrate dev --name nombre_de_tu_migracion
```

### Reset de la base de datos (⚠️ Borra todos los datos)

```bash
cd apps/backend
bunx prisma migrate reset
```

## 🔧 Comandos Útiles

### Linting
```bash
pnpm lint
```

### Testing
```bash
# Todos los tests
pnpm test

# Solo backend
cd apps/backend && bun test

# Solo mobile
cd apps/mobile && pnpm test
```

### Build
```bash
# Build todo
pnpm build

# Solo backend
pnpm build:backend

# Solo mobile
pnpm build:mobile
```

### Limpiar todo
```bash
pnpm clean
```

## 🔐 Configurar Google OAuth

### 1. Ir a Google Cloud Console
https://console.cloud.google.com/

### 2. Crear un proyecto
- Nombre: "La Mafia Game"

### 3. Habilitar Google+ API

### 4. Crear credenciales OAuth 2.0

**Para Backend (Web):**
- Tipo: Aplicación web
- URIs de redirección autorizados:
  - http://localhost:3000/auth/google/callback
  - https://tu-dominio.com/auth/google/callback

**Para Mobile (iOS):**
- Tipo: iOS
- Bundle ID: com.lamafiaGame.app

**Para Mobile (Android):**
- Tipo: Android
- Package name: com.lamafiaGame.app
- SHA-1: (obtener con `cd apps/mobile/android && ./gradlew signingReport`)

### 5. Copiar los Client IDs
Pega los Client IDs en los archivos `.env` correspondientes.

## 🌐 Configurar Supabase

### 1. Crear cuenta en Supabase
https://supabase.com/

### 2. Crear un nuevo proyecto

### 3. Obtener la connection string
Settings → Database → Connection string

### 4. Copiar al .env
```env
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@[HOST]:5432/postgres"
```

## ✅ Verificar la Instalación

```bash
# Backend
curl http://localhost:3000/health
# Debería devolver: {"status":"healthy",...}

# Mobile
# La app debería abrir sin errores en Expo Go
```

## 🆘 Troubleshooting

### Error: "Cannot find module '@prisma/client'"
```bash
pnpm prisma:generate
```

### Error: "Port 3000 already in use"
```bash
# Cambiar el puerto en apps/backend/.env
PORT=3001
```

### Error: Expo no encuentra el backend
- Verifica que ambos estén en la misma red
- Usa la IP local en lugar de localhost en `apps/mobile/.env`:
  ```env
  API_URL=http://192.168.1.x:3000
  ```

### Error: "Google Sign-In failed"
- Verifica que los Client IDs sean correctos
- Verifica que las URIs de redirección estén configuradas en Google Console
- Para iOS: Verifica el Bundle ID
- Para Android: Verifica el Package name y SHA-1

## 📚 Recursos

- [Bun Documentation](https://bun.sh/docs)
- [Elysia Documentation](https://elysiajs.com/introduction.html)
- [Expo Documentation](https://docs.expo.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🎯 Próximos Pasos

Una vez que todo esté funcionando:

1. ✅ Revisar el archivo `requirements.md` para entender las funcionalidades
2. ✅ Explorar el schema de Prisma en `apps/backend/prisma/schema.prisma`
3. ✅ Comenzar a implementar las rutas del backend en `apps/backend/src/routes/`
4. ✅ Crear las pantallas de la app en `apps/mobile/src/screens/`
5. ✅ Implementar la autenticación con Google OAuth

¡Listo para desarrollar! 🚀
