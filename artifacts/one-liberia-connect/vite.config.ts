import path from 'path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    'BASE_PATH environment variable is required but was not provided.',
  );
}

const routeMetadata = {
  '/': {
    title: 'Connecting Communities Across Liberia',
    description:
      'One Liberia Connect is working to bring affordable internet, planned school technology hubs, community champions, and partnership opportunities across Liberia.',
  },
  '/about': {
    title: 'About One Liberia Connect',
    description:
      'Learn about One Liberia Connect’s mission to bridge connectivity gaps with communities, schools, diaspora, and partners.',
  },
  '/services': {
    title: 'Our Services',
    description:
      'Explore One Liberia Connect’s work toward affordable internet, planned school technology hubs, and community-led connectivity.',
  },
  '/our-cause': {
    title: 'Our Cause',
    description:
      'Learn why One Liberia Connect is working toward affordable internet and digital learning opportunities across Liberia.',
  },
  '/partners': {
    title: 'Partners and Investors',
    description:
      'Explore how schools, diaspora, community champions, and investment partners can connect with One Liberia Connect.',
  },
  '/connect-your-community': {
    title: 'Connect Your Community',
    description:
      'Share your community’s interest in connectivity. Requests guide feasibility reviews; the campaign says communities with the most requests get a review by December 2026.',
  },
  '/contact': {
    title: 'Contact One Liberia Connect',
    description:
      'Contact One Liberia Connect about community requests, partnership opportunities, and the work to connect communities across Liberia.',
  },
} as const;

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

function staticRouteMetadata() {
  return {
    name: 'static-route-metadata',
    apply: 'build' as const,
    async closeBundle() {
      const outputDirectory = path.resolve(import.meta.dirname, 'dist/public');
      const template = await readFile(
        path.join(outputDirectory, 'index.html'),
        'utf8',
      );

      for (const [route, metadata] of Object.entries(routeMetadata)) {
        const pageUrl = `https://1liberia.org${route}`;
        const pageTitle = `${metadata.title} | One Liberia Connect`;
        let html = template.replace(
          /<title>[\s\S]*?<\/title>/,
          `<title>${escapeHtml(pageTitle)}</title>`,
        );
        const replaceMeta = (
          attribute: 'name' | 'property',
          key: string,
          content: string,
        ) => {
          html = html.replace(
            new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`),
            `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
          );
        };

        replaceMeta('name', 'description', metadata.description);
        replaceMeta('property', 'og:title', pageTitle);
        replaceMeta('property', 'og:description', metadata.description);
        replaceMeta('property', 'og:url', pageUrl);
        replaceMeta('name', 'twitter:title', pageTitle);
        replaceMeta('name', 'twitter:description', metadata.description);
        html = html.replace(
          /<link rel="canonical" href="[^"]*"\s*\/>/,
          `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`,
        );

        const pageFile =
          route === '/'
            ? path.join(outputDirectory, 'index.html')
            : path.join(outputDirectory, route.slice(1), 'index.html');
        await mkdir(path.dirname(pageFile), { recursive: true });
        await writeFile(pageFile, html);
      }
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    staticRouteMetadata(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
