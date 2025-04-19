# Technical Context

## Technology Stack

### Frontend

- **Astro** (v5.7.1)

  - Static site generation
  - Vue.js integration
  - File-based routing

- **Vue.js** (v3.5.13)

  - Component-based UI
  - Reactive state management
  - Composition API

- **TailwindCSS** (v4.1.4)
  - Utility-first CSS
  - Responsive design
  - Custom theming

### Backend

- **Supabase**
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication
  - Row Level Security

### Additional Services

- **Resend** (v4.3.0)

  - Email service
  - Transactional emails
  - Email templates

- **OpenAI** (v4.94.0)
  - AI game assistance
  - Natural language processing
  - Game state analysis

### Development Tools

- **TypeScript**

  - Type safety
  - Better IDE support
  - Enhanced maintainability

- **Vercel**
  - Deployment platform
  - CI/CD pipeline
  - Environment management

## Development Setup

### Prerequisites

- Node.js (Latest LTS version)
- npm or yarn
- Git
- Supabase account
- Vercel account

### Environment Variables

Required environment variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
OPENAI_API_KEY=your_openai_api_key
```

### Local Development

1. Clone repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Set up environment variables
5. Run development server: `npm run dev`

### Build Process

1. Development: `npm run dev`
2. Production build: `npm run build`
3. Preview build: `npm run preview`

## Technical Constraints

### Performance

- Real-time updates must be < 100ms latency
- Initial page load < 2s
- Time to interactive < 3s

### Scalability

- Support for multiple concurrent games
- Real-time updates for all players
- Efficient database queries

### Security

- Secure authentication
- Protected game state
- Input validation
- XSS prevention

## Dependencies

### Core Dependencies

```json
{
  "astro": "^5.7.1",
  "@astrojs/vue": "^5.0.10",
  "@supabase/supabase-js": "^2.39.7",
  "vue": "^3.5.13",
  "tailwindcss": "^4.1.4"
}
```

### Development Dependencies

```json
{
  "@types/bcryptjs": "^2.4.6",
  "typescript": "latest",
  "@astrojs/vercel": "^8.1.3"
}
```

## API Integration

### Supabase

- Authentication
- Database operations
- Real-time subscriptions
- Storage

### OpenAI

- Game assistance
- Natural language processing
- State analysis

### Resend

- Email notifications
- Game invites
- Password reset
