import React from 'react'
import Link from '@phenomic/plugin-renderer-react/lib/components/Link'
import { addLocaleData, FormattedMessage } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'

addLocaleData([...en, ...fr])

const messages = {
  en: {
    HOME: 'Home',
    PAGE_HOME: '/en',
    SUBMIT_TALK: 'Submit a talk',
    SPONSORS: 'Sponsors',
    PAGE_SPONSORS: '/en/sponsors',
    PAGE_SUBMIT_TALK: '/en/submission/talk',
    PAGE_FAQ: '/en/faq',
    FAQ: 'FAQ',
    SPONSOR_TITLE: 'Our sponsors',
    SPONSOR_DESCRIPTION: 'List of our latest sponsors. Sponsorise Paris.js on submit this form.',
    SPONSOR_INTRO: 'A big thank you to the sponsoring companies for hosting us on their offices or offering the buffet.<br />If you want to sponsor us, just fill in <a href="https://docs.google.com/forms/d/e/1FAIpQLSfyJchaXT8Rv1bMFtdECCeW5Np-TvN1QVipYQvcfMLdLj6Vcw/viewform">this form</a>'
  },
  fr: {
    HOME: 'Accueil',
    PAGE_HOME: '/',
    SUBMIT_TALK: 'Soumettre un sujet',
    SPONSORS: 'Partenaires',
    PAGE_SPONSORS: '/partenaires',
    PAGE_SUBMIT_TALK: '/propositions/sujet',
    PAGE_FAQ: '/faq',
    FAQ: 'FAQ',
    SPONSOR_TITLE: 'Nos partenaires',
    SPONSOR_DESCRIPTION: 'Liste de nos derniers partenaires. Sponsorisez un Paris.js en replissant le formulaire.',
    SPONSOR_INTRO: 'Un grand merci aux entreprises sponsors de nous avoir accueilli dans leurs locaux ou offert le buffet.<br />Si vous souhaitez nous sponsoriser, il suffit de remplir <a href="https://docs.google.com/forms/d/e/1FAIpQLSfyJchaXT8Rv1bMFtdECCeW5Np-TvN1QVipYQvcfMLdLj6Vcw/viewform">ce formulaire</a>'

  }
}

export const defaultLocale = 'fr'
export const locales = ['fr', 'en']

export function getLocale(url) {
  const firstURIlevel = url.replace(/^\//, '').split('/')[0]

  return firstURIlevel && locales.indexOf(firstURIlevel) > -1
    ? firstURIlevel
    : defaultLocale
}

export function getIntl(locale) {
  return {
    locale: locale,
    key: locale,
    messages: messages[locale],
    defaultLocale: defaultLocale,
  }
}

export function IntlLink({ to, title }) {
  return (
    <FormattedMessage id={to}>
      {(txt) => (
        <Link to={txt}>
          <FormattedMessage id={title} />
        </Link>
      )}
    </FormattedMessage>
  )
}

export function LocalLink({ to, children }) {
  const locale = getLocale(typeof location !== 'undefined' ? location.pathname : '/')

  return (
    <Link to={`${locale !== defaultLocale ? locale : ''}${to}`} >
      {children}
    </Link>
  )
}
