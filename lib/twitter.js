const puppeteer = require('puppeteer')
let chrome = {}

module.exports = async function getAvatarUrl(username) {
  const browser = await getBrowser()
  let page = await browser.newPage()
  try {
    const url = `https://twitter.com/${username}/photo`
    await page.goto(url)

    // Get the avatar's url
    const avatar = await page.waitForSelector('img[alt="Image"]', {
      timeout: 1000,
    })
    const avatarUrl = await avatar.getProperty('src')
    const originalUrl = await avatarUrl.jsonValue()

    return adjustAvatarSize(originalUrl)
  } finally {
    await page.close()
  }
}

const REGEX_IMG_MODIFIERS = /_(?:bigger|mini|normal|400x400)\./
const ORIGINAL_IMG_SIZE = '_reasonably_small'

function adjustAvatarSize(url) {
  return url.replace(REGEX_IMG_MODIFIERS, `${ORIGINAL_IMG_SIZE}.`)
}

let _browser
async function getBrowser() {
  if (!_browser) {
    _browser = await puppeteer.launch({
      args: [
        ...(chrome.args || []),
        '--hide-scrollbars',
        '--disable-web-security',
      ],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    })
  }
  return _browser
}
