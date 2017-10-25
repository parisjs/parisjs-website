import React from 'react'
import Head from 'react-helmet'
import { createContainer, query, BodyRenderer } from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

const FAQContainer = () => (
  <Layout>
    <Head>
      <title>Hello world</title>
      <meta name="description" content="Everything is awaysome!" />
    </Head>

    <h1>La Foire Aux Question</h1>

    <h2>Lorem ipsum</h2>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </Layout>
)

export default FAQContainer
