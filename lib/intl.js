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

export function MenuLink({ to, title, activeClassName }) {
  const router = useRouter()
  const { pathname } = router
  const isActive = i18next.getDataByLanguage('fr').translation[to] === pathname
  return (
    <Link href={i18next.t(to)} prefetch={false}>
      <a className={isActive ? activeClassName : undefined}>
        {i18next.t(title)}
      </a>
    </Link>
  )
}
