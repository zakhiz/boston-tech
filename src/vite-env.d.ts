/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GCLOUD_PROJECT_ID: string;
    readonly VITE_CLIENT_ID: string;
    readonly VITE_GCLOUD_SCOPES: string;
    readonly VITE_DATE_SEARCH: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}