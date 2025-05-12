import { defineConfig } from 'vitepress'
import typedocSidebar from '../api/typedoc-sidebar.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@ryanuo/utils',
  description: 'A VitePress Site',
  themeConfig: {
    nav: [{
      text: 'API',
      link: '/api/',
    }],
    sidebar: [
      {
        text: 'API',
        items: typedocSidebar,
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ryanuo/utils' },
    ],
  },
})
