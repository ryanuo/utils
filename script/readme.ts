import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import typedocSidebar from '../docs/api/typedoc-sidebar.json'
import { transDocsJson } from '../docs/.vitepress/utils'
import { logger } from '../src/node'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const readmePath = path.resolve(__dirname, '../README.md')

function linkElement(text: string, link: string, isFunction?: boolean): string {
  if (link.endsWith('.md'))
    link = link.replace('.md', '.html')
  if (isFunction && !/^[A-Z]/.test(text))
    text = `${text}()`

  return `[${text}](https://utils.ryanuo.cc${link})`
}

function generateMarkdownTable(exports: any[]): string {
  const lines = ['| Type | Function List |', '|------|----------------|']

  const getTopLevelFunctions = (item: any): {
    text: string
    link: string
  }[] => {
    if (!item.items)
      return [item]

    return item.items ? item.items.flatMap(getTopLevelFunctions) : []
  }

  for (const item of exports) {
    const topLevelFunctions = getTopLevelFunctions(item)
    lines.push(`| ${linkElement(item.text, item.link)} | ${topLevelFunctions
      ?.filter(a => /^[a-z]/.test(a.text))
      ?.map(item => linkElement(item.text, item.link, true)).join('；') || '-'} |`)
  }

  return lines.join('\n')
}

function updateReadme(content: string, table: string): string {
  const startTag = '<!-- auto utils start -->'
  const endTag = '<!-- auto utils end -->'
  const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, 'g')
  return content.replace(regex, `${startTag}\n${table}\n${endTag}`)
}

async function main() {
  const exports = await transDocsJson(typedocSidebar)
  const markdownTable = generateMarkdownTable(exports)

  const readmeContent = fs.readFileSync(readmePath, 'utf-8')
  const updatedReadme = updateReadme(readmeContent, markdownTable)

  fs.writeFileSync(readmePath, updatedReadme, 'utf-8')

  logger.green('README.md updated successfully.')
}

main().catch(console.error)
