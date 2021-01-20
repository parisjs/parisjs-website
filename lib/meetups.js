// This file is used by both node and nextjs
const fs = require('fs').promises
const path = require('path')
const crypto = require('crypto')
const matter = require('gray-matter')

const meetupPath = path.join(process.cwd(), 'content', 'meetups')

exports.getAllMeetupIds = getAllMeetupIds
exports.getMeetupData = getMeetupData
exports.getAllMeetups = getAllMeetups

async function getAllMeetupIds() {
  const filenames = await fs.readdir(meetupPath)
  return filenames.map((filename) => filename.split('.')[0])
}

async function getMeetupData(id) {
  const file = await fs.readFile(path.join(meetupPath, `${id}.md`), 'utf8')
  const { data } = matter(file)
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
  const meetups = []

  for (const id of ids) {
    meetups.push(await getMeetupData(id))
  }

  return meetups
}

function md5(m) {
  return crypto.createHash('md5').update(m).digest('hex')
}
