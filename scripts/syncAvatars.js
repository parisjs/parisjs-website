const loadEnv = require('../lib/loadEnv')
const getAvatarUrl = require('../lib/twitter')
const {
  getAllMeetups,
  getTwitterAvatars,
  saveTwitterAvatars,
} = require('../lib/meetups')

syncAvatars()
  .then(() => {
    console.log('END.')
    process.exit(0)
  })
  .catch(function (e) {
    console.error(e)
    process.exit(1)
  })

async function syncAvatars() {
  loadEnv()
  const meetups = await getAllMeetups()
  const uniqueTwitterUsernames = [
    ...new Set(
      meetups
        .flatMap((m) => m.talks)
        .flatMap((t) => t.authors)
        .map((author) => {
          return author.twitter_username
        })
        .filter((username) => !!username)
    ),
  ]
  const total = uniqueTwitterUsernames.length
  console.info(`Syncing a total of ${total} twitter usernames`)

  const twitterAvatars = await getTwitterAvatars()

  for (const username of uniqueTwitterUsernames) {
    if (twitterAvatars[username]) {
      console.info('✅ found', username)
      continue
    }
    try {
      // We should fetch the avatar from twitter
      const url = await getAvatarUrl(username)
      twitterAvatars[username] = url
      console.info('✅ found', username)
    } catch (e) {
      console.warn(`❌ not found @${username}`)
    }
  }

  // persist
  await saveTwitterAvatars(twitterAvatars)
}
