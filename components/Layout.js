import i18next from 'i18next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { initI18next, MenuLink } from '../lib/intl'
import Footer from './Footer'

const Layout = ({ children }) => {
  const { locale } = useRouter()
  initI18next(locale)

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Le meetup mensuel autour du JavaScript"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <header className="header">
        <div className="container">
          <div className="header__logo">
            <Link href="/">
              <a>Paris.JS</a>
            </Link>
          </div>
          <nav className="header__nav">
            <MenuLink
              to="PAGE_CODE_OF_CONDUCT"
              title="CODE_OF_CONDUCT"
              activeClassName="active"
            />
            <MenuLink to="PAGE_FAQ" title="FAQ" activeClassName="active" />

            <MenuLink
              to="PAGE_SPONSORS"
              title="SPONSORS"
              activeClassName="active"
            />

            <a
              href="https://github.com/parisjs/talks/issues/new?assignees=&labels=&template=cfp.yml"
              className="main_action"
            >
              {i18next.t('SUBMIT_TALK')}
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.25 4.75a1.5 1.5 0 0 0-1.5 1.5v11.5a1.5 1.5 0 0 0 1.5 1.5h11.5a1.5 1.5 0 0 0 1.5-1.5v-4a1 1 0 1 1 2 0v4a3.5 3.5 0 0 1-3.5 3.5H6.25a3.5 3.5 0 0 1-3.5-3.5V6.25a3.5 3.5 0 0 1 3.5-3.5h4a1 1 0 1 1 0 2h-4Zm6.5-1a1 1 0 0 1 1-1h6.5a1 1 0 0 1 1 1v6.5a1 1 0 1 1-2 0V6.164l-4.793 4.793a1 1 0 1 1-1.414-1.414l4.793-4.793H13.75a1 1 0 0 1-1-1Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </nav>

          <div className="languageSwitcher">
            <Link href="/" locale="fr" prefetch={false}>
              <a href="/">FR</a>
            </Link>
            <Link href="/en" locale="en" prefetch={false}>
              <a>EN</a>
            </Link>
          </div>
        </div>
      </header>
      {children}
      <Footer />
    </div>
  )
}

export default Layout
