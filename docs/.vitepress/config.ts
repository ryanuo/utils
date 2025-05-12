import { defineConfig } from 'vitepress'
import typedocSidebar from '../api/typedoc-sidebar.json'

function transDocsJson(typedocSidebar: any) {
  return typedocSidebar.map((element: any) => {
    const updatedElement = {
      ...element,
      text: element.text?.charAt(0).toUpperCase() + element.text?.slice(1),
    }

    if (updatedElement.items?.length) {
      updatedElement.items = updatedElement.items.flatMap((item: any) =>
        ['Reference', 'Project', 'Module', 'Namespace', 'Enum', 'EnumMember', 'Class', 'Interface', 'TypeAlias', 'Constructor', 'Property', 'Variable', 'Function', 'Accessor', 'Method', 'Parameter', 'TypeParameter', 'TypeLiteral', 'CallSignature', 'ConstructorSignature', 'IndexSignature', 'GetSignature', 'SetSignature'].includes(item.text.replace(/s$/, ''))
          ? item.items || []
          : item,
      )
    }

    return updatedElement
  })
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@ryanuo/utils',
  description: 'A VitePress Site',
  themeConfig: {
    nav: [{
      text: 'API',
      link: '/api/',
    }],
    sidebar: transDocsJson(typedocSidebar),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ryanuo/utils' },
    ],
  },
})
