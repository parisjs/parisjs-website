var assert = require('assert')
const { getAllMeetups } = require('../lib/meetups')

/**
 * Next.js expects us to maintain the list of domains that are used for avatar urls.
 * Failing to do so would result in a runtime error.
 * This test is here to ensure that the list is kept up to date.
 */
it('The list of image domains is up to date in next.config.js', async () => {
  const expectedAvatarDomains = new Set(
    require('../next.config').images.domains
  )

  const meetups = await getAllMeetups()
  const currentAvatarDomains = [
    ...new Set(
      meetups
        .flatMap((m) => m.talks)
        .flatMap((t) => t.authors)
        .map((a) => a.avatar)
        .filter((url) => !!url)
        .map((url) => new URL(url).hostname)
    ),
  ].sort()

  const missingDomains = currentAvatarDomains.filter(
    (domain) => !expectedAvatarDomains.has(domain)
  )

  assert.deepStrictEqual(
    missingDomains,
    [],
    'You need to add the new image domains to next.config.js'
  )
})
