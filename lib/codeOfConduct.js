import remark from 'remark'
import html from 'remark-html'
import gm from 'gray-matter'
import path from 'path'
import fs from 'fs'

const codeOfConduct = path.join(process.cwd(), 'CODE_OF_CONDUCT.md')

export async function getCodeOfConductData() {
  const fileContents = await fs.promises.readFile(codeOfConduct, 'utf8')

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
