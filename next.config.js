module.exports = {
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localeDetection: false,
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
