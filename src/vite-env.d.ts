/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTHGEAR_CLIENT_ID: string;
  readonly VITE_AUTHGEAR_ENDPOINT: string;
  readonly VITE_AUTHGEAR_REDIRECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
