# Active Context

## Current Focus

Complete implementation of clean architecture with application layer use cases. The project now follows full DDD patterns with separation of concerns between domain, application, and infrastructure layers.

## Recent Changes

- Complete refactoring from Supabase to Prisma
- Implementation of clean architecture with DDD patterns
- Domain layer created with Game and Player entities
- Infrastructure layer with Prisma repositories
- Application layer with concrete use cases implemented
- All API endpoints refactored to use application use cases
- Removed all code comments as requested

## Active Decisions

1. Technology Stack

   - Astro as the base framework
   - Vue.js for interactive components
   - Prisma for database ORM (migrated from Supabase)
   - PostgreSQL as database
   - TailwindCSS for styling

2. Architecture

   - Clean Architecture with DDD patterns
   - Domain-driven design implementation
   - Hexagonal architecture with repositories
   - File-based routing with Astro

3. Development Approach
   - TypeScript for type safety
   - Domain entities with business logic
   - Repository pattern for data access
   - Error handling with domain exceptions

## Current Considerations

1. Game Mechanics

   - Role distribution system
   - Game state management
   - Player interaction flow
   - Real-time updates

2. User Experience

   - Interface design
   - Game flow
   - Mobile responsiveness
   - Accessibility

3. Technical Implementation
   - Database schema
   - Real-time subscriptions
   - State management
   - Security measures

## Next Steps

1. Immediate Tasks

   - Set up environment variables for DATABASE_URL
   - Run database migrations with Prisma
   - Test the new use case-based API endpoints
   - Update frontend components to work with new API

2. Short-term Goals

   - Implement dependency injection container
   - Add comprehensive testing for use cases
   - Implement authentication with the new architecture
   - Add real-time features using WebSockets

3. Medium-term Goals
   - Add caching layer with Redis
   - Create event-driven architecture with domain events
   - Add monitoring and logging
   - Implement API rate limiting and security

## Active Issues

1. Technical

   - Need to finalize database schema
   - Real-time update implementation
   - State management approach

2. Design

   - UI/UX wireframes needed
   - Game flow documentation
   - Component hierarchy

3. Infrastructure
   - Deployment setup
   - Environment configuration
   - CI/CD pipeline

## Current Questions

1. Game Design

   - How many roles to support?
   - What are the game phases?
   - How to handle player disconnections?

2. Technical

   - Best approach for real-time updates?
   - How to handle game state?
   - What security measures are needed?

3. User Experience
   - How to make the game intuitive?
   - What feedback mechanisms are needed?
   - How to handle different screen sizes?
