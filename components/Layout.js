import React from 'react'
import Head from 'react-helmet'
import { Link } from 'react-router'

const Layout = ({ children }) => (
  <div>
    <Head>
      <html lang="en" /> { /* this is valid react-helmet usage! */ }
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <header>
      <Link to={ `/`}>HOME</Link> <br />
      <Link to={ `/faq`}>FAQ</Link> <br />
      <Link to={ `/propositions/talk`}>Proposer un talk</Link> <br />
      <Link to={ `/propositions/sponsor`}>Sponsor</Link> <br />
      { /* ... */ }
    </header>
    <div>{ children }</div>
    <footer>
      { /* ... */ }
    </footer>
  </div>
)

export default Layout
