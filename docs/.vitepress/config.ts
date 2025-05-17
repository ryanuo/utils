import { defineConfig } from 'vitepress'
import typedocSidebar from '../api/typedoc-sidebar.json'
import { version } from '../../package.json'
import { transDocsJson } from './utils'

const env = (import.meta as any).env
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@ryanuo/utils',
  description: 'A collection of useful utilities for web development.',
  head: [
    ['link', { href: '/style.css', rel: 'stylesheet', type: 'text/css' }],
    ['link', { rel: 'icon', href: '/utils.svg' }],
  ],
  themeConfig: {
    nav: [{
      text: 'Guide',
      link: '/guide.html',
    }, {
      text: 'API',
      link: '/api.html',
    }, {
      text: `v${version}`,
      items: [
        {
          text: 'Release Notes',
          link: 'https://github.com/ryanuo/utils/releases',
        },
      ],
    }],
    sidebar: [
      {
        text: 'Functions',
        items: transDocsJson(typedocSidebar),
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ryanuo/utils' },
    ],
    search: {
      provider: 'algolia',
      options: {
        // https://crawler.algolia.com/admin/crawlers
        appId: env.VITE_ALGOLIA_APP_ID,
        apiKey: env.VITE_ALGOLIA_API_KEY,
        indexName: env.VITE_ALGOLIA_INDEX_NAME,
      },
    },
    editLink: {
      pattern: 'https://github.com/ryanuo/utils/edit/main/docs/:path',
    },
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
  },
})
