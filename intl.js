import React from 'react'
import { Link } from 'react-router'
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
    FAQ: 'FAQ'
  },
  fr: {
    HOME: 'Accueil',
    PAGE_HOME: '/',
    SUBMIT_TALK: 'Soumettre un sujet',
    SPONSORS: 'Partenaires',
    PAGE_SPONSORS: '/partenaires',
    PAGE_SUBMIT_TALK: '/propositions/sujet',
    PAGE_FAQ: '/faq',
    FAQ: 'FAQ'
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
    <FormattedMessage id={ to }>
      {(txt) => (
        <Link to={ txt }>
          <FormattedMessage id={ title } />
        </Link>
      )}
    </FormattedMessage>
  )
}

export function LocalLink({ to, children }) {
  const locale = getLocale(typeof location !== 'undefined' ? location.pathname : '/')

  return (
    <Link to={ `${locale !== defaultLocale ? locale : ''}${to}` } >
      { children }
    </Link>
  )
}
