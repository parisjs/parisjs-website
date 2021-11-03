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
      </Head>
      <header className="header">
        <div className="container">
          <div className="header__logo">
            <Link href="/">
              <a>Paris.JS</a>
            </Link>
          </div>
          <nav className="header__nav">
            <MenuLink to="PAGE_HOME" title="HOME" activeClassName="active" />
            <MenuLink to="PAGE_CODE_OF_CONDUCT" title="CODE_OF_CONDUCT" activeClassName="active" />
            <MenuLink to="PAGE_FAQ" title="FAQ" activeClassName="active" />
            <MenuLink
              to="PAGE_SUBMIT_TALK"
              title="SUBMIT_TALK"
              activeClassName="active"
            />
            <MenuLink
              to="PAGE_SPONSORS"
              title="SPONSORS"
              activeClassName="active"
            />
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
