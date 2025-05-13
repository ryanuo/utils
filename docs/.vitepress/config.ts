import { defineConfig } from 'vitepress'
import typedocSidebar from '../api/typedoc-sidebar.json'
import { transDocsJson } from './utils'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@ryanuo/utils',
  description: 'A VitePress Site',
  head: [
    ['link', { rel: 'icon', href: '/utils.svg' }],
  ],
  themeConfig: {
    nav: [{
      text: 'API',
      link: '/api/',
    }],
    sidebar: transDocsJson(typedocSidebar),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ryanuo/utils' },
    ],
    search: {
      provider: 'local',
    },
  },
})
