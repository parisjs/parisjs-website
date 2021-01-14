const fs = require('fs')
const path = require('path')
const utils = require('util')
const crypto = require('crypto')

const fm = require('front-matter')
const algolia = require('algoliasearch')

const readdir = utils.promisify(fs.readdir)
const readFile = utils.promisify(fs.readFile)

const baseDir = '../content/meetups'

indexMeetups().catch(function(e) {
  console.error(e)
  process.exit(1)
})

function md5(m) {
  return crypto
    .createHash('md5')
    .update(m)
    .digest('hex')
}

async function indexMeetups() {
  const meetups = await readMeetups()
  const records = meetupsToRecords(meetups)

  const credentials = getCredentials()

  await uploadDataWithClear(credentials, 'paris.js-meetups', records)
}

async function readMeetups() {
  const files = await readdir(path.join(__dirname, baseDir))
  return Promise.all(
    files.map(async file => {
      const content = await readFile(
        path.join(__dirname, baseDir, file),
        'utf8'
      )
      const id = file.split('.')[0]
      return {
        ...fm(content).attributes,
        id
      }
    })
  )
}

function meetupsToRecords(meetups) {
  return meetups.map(m => ({
    ...m,
    dateUnix: new Date(m.date).getTime(),
    objectID: m.edition,
    hash: md5(JSON.stringify(m))
  }))
}

function getCredentials() {
  if (!process.env.ALGOLIA_APPLICATION_ID)
    throw new Error('ALGOLIA_APPLICATION_ID must be defined')
  if (!process.env.ALGOLIA_ADMIN_KEY)
    throw new Error('ALGOLIA_ADMIN_KEY must be defined')

  const {
    ALGOLIA_APPLICATION_ID: appID,
    ALGOLIA_ADMIN_KEY: apiKey
  } = process.env
  return { appID, apiKey }
}

async function uploadDataWithClear({ appID, apiKey }, indexName, toUpload) {
  const client = algolia(appID, apiKey)
  const index = client.initIndex(indexName)
  console.log('clearing index')
  const content = await index.clearIndex()
  await index.waitTask(content.taskID)
  console.log('Sending to Algolia - ' + toUpload.length + ' records')
  index.addObjects(toUpload)
}
