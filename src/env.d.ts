/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly SITE: string;
  readonly APP_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference path="..\.astro-i18n\generated.d.ts" />
