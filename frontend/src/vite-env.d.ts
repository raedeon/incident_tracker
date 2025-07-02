// This file is used to define the types for the environment variables in a Vite project.
// It allows TypeScript to understand the types of the environment variables used in the application.

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
