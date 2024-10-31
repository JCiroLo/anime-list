/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: "development" | "production" | "test";
  readonly VITE_DEBUGGER: "true" | "false";
  readonly VITE_API_URL: string;

  readonly PACKAGE_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
