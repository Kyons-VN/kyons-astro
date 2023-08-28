import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import i18n from 'astro-i18n';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://kyons.vn',
  integrations: [
    i18n(),
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'vi',
        locales: {
          vi: 'vi-VN',
          en: 'en-US',
        },
      },
    }),
    robotsTxt(),
    preact(),
  ],
});

export const { APP_URL } = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), 'AAA');
