# Elastos DAO Elections Dashboard

A real-time dashboard for tracking Elastos DAO Council Representative elections.

## Features

- Real-time election status and countdown
- Live candidate rankings and vote counts
- Current and end block height tracking
- Auto-refresh every 2 minutes
- Mobile-responsive design

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- Radix UI

## Prerequisites

- Node.js >= 18.17.0
- npm >= 9.0.0

## Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dao-elections.git
cd dao-elections
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## Production Build

1. Build the project:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Deployment

The application is configured for deployment on Render.com. The deployment process is automated through the `render.yaml` configuration.

### Environment Variables

Required environment variables:
- `NODE_VERSION`: 18.17.0
- `PORT`: 10000
- `NODE_ENV`: production

## API Endpoints

The application uses the following APIs:
- Elastos JSON-RPC API
- Cyber Republic API

## License

MIT 