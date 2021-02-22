// This file is used by both node and nextjs
const fs = require('fs').promises
const path = require('path')
const crypto = require('crypto')
const matter = require('gray-matter')

const meetupPath = path.join(process.cwd(), 'content/meetups')
const twitterAvatarsPath = path.join(
  process.cwd(),
  'content/avatars/twitter.json'
)

exports.getAllMeetupIds = getAllMeetupIds
exports.getMeetupData = getMeetupData
exports.getAllMeetups = getAllMeetups
exports.getNextMeetup = getNextMeetup
exports.getTwitterAvatars = getTwitterAvatars
exports.saveTwitterAvatars = saveTwitterAvatars

async function getTwitterAvatars() {
  const file = await fs.readFile(twitterAvatarsPath, 'utf8')
  return JSON.parse(file)
}

async function saveTwitterAvatars(twitterAvatars) {
  await fs.writeFile(
    twitterAvatarsPath,
    JSON.stringify(twitterAvatars, null, 2),
    'utf-8'
  )
}

async function getAllMeetupIds() {
  const filenames = await fs.readdir(meetupPath)
  return filenames.map((filename) => filename.split('.')[0])
}

async function getMeetupData(id, twitterAvatars) {
  const file = await fs.readFile(path.join(meetupPath, `${id}.md`), 'utf8')
  const { data } = matter(file)
  for (const talk of data.talks) {
    for (const author of talk.authors) {
      if (author.avatar && author.avatar.startsWith('twitter/')) {
        const username = author.avatar.slice(8)
        author.twitter_username = username
        author.avatar = twitterAvatars[username] || null
      }
    }
  }
  const meetup = {
    ...data,
    id,
    dateUnix: new Date(data.date).getTime(),
    objectID: data.edition,
    hash: md5(JSON.stringify(data)),
  }

  return meetup
}

async function getAllMeetups() {
  const ids = await getAllMeetupIds()
  const twitterAvatars = await getTwitterAvatars()
  const meetups = []

  for (const id of ids) {
    meetups.push(await getMeetupData(id, twitterAvatars))
  }

  return meetups
}

function md5(m) {
  return crypto.createHash('md5').update(m).digest('hex')
}

function getNextMeetup() {
  const url = 'https://www.meetup.com/fr-FR/Paris-js/events/json/'
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length) {
        return {
          title: data[0].title,
          date: data[0].servertime,
          link: data[0].event_url,
          rsvp: data[0].confirmCount,
          host: data[0].venue_name,
          address: `${data[0].venue_address1} ${data[0].venue_city}`,
        }
      }
      return null
    })
    .catch(() => null)
}
