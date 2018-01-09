import React from 'react'
import { Link } from 'react-router'
import { addLocaleData, FormattedMessage } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import messages from './lang'

addLocaleData([...en, ...fr])

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
    defaultLocale: defaultLocale
  }
}

export function IntlLink({ to, title }) {
  return (
    <FormattedMessage id={to}>
      {txt => (
        <Link to={txt}>
          <FormattedMessage id={title} />
        </Link>
      )}
    </FormattedMessage>
  )
}

export function LocalLink({ to, children, ...otherProps }) {
  const locale = getLocale(
    typeof location !== 'undefined' ? location.pathname : '/'
  )

  return (
    <Link to={`${locale !== defaultLocale ? locale : ''}${to}`} {...otherProps}>
      {children}
    </Link>
  )
}
