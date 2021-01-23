import remark from 'remark'
import html from 'remark-html'
import gm from 'gray-matter'
import path from 'path'
import fs from 'fs'

const faqDirectory = path.join(process.cwd(), 'content', 'faq')

export async function getFaqData({ locale }) {
  const fullPath = path.join(faqDirectory, `${locale}.md`)
  const fileContents = await fs.promises.readFile(fullPath, 'utf8')

  const matterResult = gm(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const body = processedContent.toString()

  return {
    ...matterResult.data,
    body,
  }
}
