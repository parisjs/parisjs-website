import React from 'react'
import Head from 'react-helmet'
import { Link } from 'react-router'
import { IntlProvider, FormattedMessage } from 'react-intl'

import { getLocale, getIntl, IntlLink } from '../intl'
import Footer from './Footer'

const Layout = ({ children }) => {
  const locale = getLocale(
    typeof location !== 'undefined' ? location.pathname : '/'
  )
  const intl = getIntl(locale)

  return (
    <IntlProvider {...intl}>
      <div>
        <Head>
          <html lang={locale} /> {/* this is valid react-helmet usage! */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <header className="header">
          <div className="container">
            <div className="header__logo">
              <Link to="/">Paris.JS</Link>
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
              <Link to={`/`}>FR</Link>
              <Link to={`/en`}>EN</Link>
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
