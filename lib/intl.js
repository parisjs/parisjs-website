import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import messages from '../lang'

export const defaultLocale = 'fr'

export function getIntl(locale) {
  return {
    locale: locale,
    key: locale,
    messages: messages[locale],
    defaultLocale: defaultLocale,
  }
}

export function IntlLink({ to, title, activeClassName }) {
  const { pathname } = useRouter()
  const intl = useIntl()
  const isActive = getIntl('fr').messages[to] === pathname
  return (
    <Link
      href={intl.formatMessage({
        id: to,
      })}
    >
      <a className={isActive ? activeClassName : undefined}>
        {intl.formatMessage({
          id: title,
        })}
      </a>
    </Link>
  )
}

function formatLink({ to, locale }) {
  const prefix = locale !== defaultLocale ? `/${locale}` : ''
  return `${prefix}${to}`
}

export function LocalLink({ to, children, ...otherProps }) {
  const { locale } = useRouter()

  return (
    <Link href={formatLink({ to, locale })}>
      <a {...otherProps}>{children}</a>
    </Link>
  )
}
