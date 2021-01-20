import Head from 'next/head'
import Link from 'next/link'
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router'
import { getIntl, IntlLink } from '../lib/intl'
import Footer from './Footer'

const Layout = ({ children }) => {
  const { locale } = useRouter()
  const intl = getIntl(locale)

  return (
    <IntlProvider {...intl}>
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
              <IntlLink to="PAGE_HOME" title="HOME" activeClassName="active" />
              <IntlLink to="PAGE_FAQ" title="FAQ" activeClassName="active" />
              <IntlLink
                to="PAGE_SUBMIT_TALK"
                title="SUBMIT_TALK"
                activeClassName="active"
              />
              <IntlLink
                to="PAGE_SPONSORS"
                title="SPONSORS"
                activeClassName="active"
              />
            </nav>

            <div className="languageSwitcher">
              <Link href="/" locale="fr">
                <a href="/">FR</a>
              </Link>
              <Link href="/en" locale="en">
                <a>EN</a>
              </Link>
            </div>
          </div>
        </header>
        {children}
        <Footer />
      </div>
    </IntlProvider>
  )
}

export default Layout
