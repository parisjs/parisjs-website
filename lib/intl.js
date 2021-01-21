import Link from 'next/link'
import { useRouter } from 'next/router'
import i18next from 'i18next'
import ICU from 'i18next-icu'
import messages from '../lang'

export const defaultLocale = 'fr'

export function initI18next(locale) {
  return i18next.use(ICU).init({
    resources: {
      fr: {
        translation: messages.fr,
      },
      en: {
        translation: messages.en,
      },
    },
    lng: locale,
    fallbackLng: defaultLocale,
  })
}

export function IntlLink({ to, title, activeClassName }) {
  const { pathname } = useRouter()
  const isActive = i18next.getDataByLanguage('fr').translation[to] === pathname
  return (
    <Link href={i18next.t(to)}>
      <a className={isActive ? activeClassName : undefined}>
        {i18next.t(title)}
      </a>
    </Link>
  )
}

function formatLink({ to }) {
  const locale = i18next.language
  const prefix = locale !== defaultLocale ? `/${locale}` : ''
  return `${prefix}${to}`
}

export function LocalLink({ to, children, ...otherProps }) {
  return (
    <Link href={formatLink({ to })}>
      <a {...otherProps}>{children}</a>
    </Link>
  )
}
