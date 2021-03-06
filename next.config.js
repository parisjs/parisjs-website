module.exports = {
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localeDetection: false,
  },
  images: {
    domains: [
      // twitter
      'abs.twimg.com',
      'pbs.twimg.com',
      // github
      'avatars0.githubusercontent.com',
      // firebase
      'www.firebase.com',
      // gravatar
      'secure.gravatar.com',
      'www.gravatar.com',
      // Linkedin
      'm.c.lnkd.licdn.com',
      // Add other source of images when needed
    ],
  },
  env: {
    // Algolia
    NEXT_PUBLIC_ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
    NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    NEXT_PUBLIC_ALGOLIA_API_KEY: process.env.PUBLIC_ALGOLIA_API_KEY,
    // GitHub
    NEXT_PUBLIC_GITHUB_APP_ID: process.env.GITHUB_APP_ID,
    NEXT_PUBLIC_GITHUB_TALK_REPO_OWNER: process.env.GITHUB_TALK_REPO_OWNER,
    NEXT_PUBLIC_GITHUB_TALK_REPO_NAME: process.env.GITHUB_TALK_REPO_NAME,
    NEXT_PUBLIC_GITHUB_OAUTH_PROXY: process.env.GITHUB_OAUTH_PROXY,
  },
  async rewrites() {
    return [
      {
        source: '/en/submission/talk',
        destination: '/propositions/sujet',
        locale: false,
      },
      {
        source: '/en/sponsors',
        destination: '/partenaires',
        locale: false,
      },
    ]
  },
}
