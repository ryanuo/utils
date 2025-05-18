/* eslint-disable no-console */
import process from 'node:process'
import dotenv from 'dotenv'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import typedocSidebar from '../api/typedoc-sidebar.json'
import { version } from '../../package.json'
import { transDocsJson } from './utils'

dotenv.config()

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
    search: getSearchConfig(process.env),
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
  markdown: {
    codeTransformers: [
      transformerTwoslash(),
    ] as any,
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
})

function getSearchConfig(env: NodeJS.ProcessEnv): DefaultTheme.Config['search'] {
  const {
    VITE_ALGOLIA_APP_ID: appId,
    VITE_ALGOLIA_API_KEY: apiKey,
    VITE_ALGOLIA_INDEX_NAME: indexName,
  } = env as any

  const hasAlgoliaConfig = Boolean(appId && apiKey && indexName)
  if (!hasAlgoliaConfig)
    throw new Error('Missing Algolia config: please check your .env file, or https://crawler.algolia.com/admin/crawlers')

  const maskedApiKey
   = `${apiKey!.slice(0, 4)}...${apiKey!.slice(-4)}`
  console.table({ appId, maskedApiKey, indexName })

  return {
    provider: 'algolia',
    options: { appId, apiKey, indexName },
  }
}
