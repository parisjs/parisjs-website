import React from 'react'
import Head from 'react-helmet'
import { Link } from 'react-router'
import { IntlProvider, FormattedMessage } from 'react-intl'

import { getLocale, getIntl, IntlLink } from '../intl'

const Layout = ({ children }) => {
  const locale = getLocale(typeof location !== 'undefined' ? location.pathname : '/')
  const intl = getIntl(locale)

  return (
    <IntlProvider {...intl}>
      <div>
        <Head>
          <html lang={ locale } /> { /* this is valid react-helmet usage! */ }
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <header>
          <IntlLink to="PAGE_HOME" title="HOME" /><br />
          <IntlLink to="PAGE_FAQ" title="FAQ" /><br />
          <IntlLink to="PAGE_SUBMIT_TALK" title="SUBMIT_TALK" /><br />
          <IntlLink to="PAGE_SPONSORS" title="SPONSORS" /><br />

          <Link to={ `/` }>FR</Link> <br />
          <Link to={ `/en` }>EN</Link> <br />
        </header>
        <div>{ children }</div>
        <footer>
          { /* ... */ }
        </footer>
      </div>
    </IntlProvider>
  )
}

export default Layout
