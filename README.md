# Standalone Elastos DAO Elections Page

This is a standalone React application containing the Elastos DAO Elections page, extracted from the main ElastosDashboard project.

## Project Structure

```
standalone-cr-elections-app/
├── client/
│   ├── public/
│   │   ├── images/
│   │   │   └── candidates/  # Candidate images
│   │   │   └── vite.svg         # Default Vite logo (can be replaced)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/          # UI components (Card, Skeleton, Alert, etc.)
│   │   │   │   └── CandidateAvatar.tsx
│   │   │   ├── pages/
│   │   │   │   └── standalone-cr-elections.tsx
│   │   │   ├── utils/         # Utility functions (API calls, image handling)
│   │   │   │   ├── candidateImages.ts
│   │   │   │   ├── elastosApi.ts
│   │   │   │   └── essentials.ts
│   │   │   └── index.css      # Global styles (Tailwind CSS)
│   │   ├── .env             # Environment variables (MANUALLY CREATE THIS FILE)
│   │   ├── .gitignore
│   │   ├── index.html         # Main HTML file
│   │   ├── package.json       # Project dependencies and scripts
│   │   ├── tsconfig.json      # TypeScript configuration
│   │   ├── tsconfig.node.json # TypeScript configuration for Node.js environment
│   │   └── vite.config.ts     # Vite build configuration
│   └── README.md          # This file
```

## Setup

1.  Navigate to the `client` directory:

    ```bash
    cd standalone-cr-elections-app/client
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  **Create the `.env` file:** Create a file named `.env` in the `client` directory and add the following content:

    ```
    NEXT_PUBLIC_ELA_API_URL=https://api.elastos.io/ela
    NEXT_PUBLIC_CR_API_URL=https://api.cyberrepublic.org/api
    ```

## Running the Application

1.  Navigate to the `client` directory if you are not already there:

    ```bash
    cd standalone-cr-elections-app/client
    ```

2.  Start the development server:

    ```bash
    npm run dev
    ```

3.  Open your browser to `http://localhost:3001` (or the port specified in `vite.config.ts`).

## Building for Production

1.  Navigate to the `client` directory:

    ```bash
    cd standalone-cr-elections-app/client
    ```

2.  Build the application:

    ```bash
    npm run build
    ```

This will generate the production-ready files in the `dist` directory. 