import React from 'react'
import Head from 'react-helmet'
import { Link } from 'react-router'
import { IntlProvider, FormattedMessage } from 'react-intl'

import { getLocale, getIntl, IntlLink } from '../intl'

const Footer = () => {
  const locale = getLocale(
    typeof location !== 'undefined' ? location.pathname : '/'
  )
  const intl = getIntl(locale)

  return (
    <IntlProvider {...intl}>
      <footer className="footer container">
        🚀 Paris.JS - <a href="https://slack-francejs.now.sh/">Slack</a> -{' '}
        <a href="https://twitter.com/parisjs">Twitter</a> -{' '}
        <a href="http://groups.google.com/group/parisjs">Google Groups</a> -{' '}
        <a href="https://github.com/parisjs">Github</a>
      </footer>
    </IntlProvider>
  )
}

export default Footer
