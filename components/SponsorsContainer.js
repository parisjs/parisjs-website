import React from 'react'
import Head from 'react-helmet'
import {
  createContainer,
  query,
  BodyRenderer
} from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

const SponsorsContainer = () => {
  const sponsors = [
    { name: 'Algolia', img: '/sponsors/algolia-logo-light.png' },
    { name: 'Parisjs', img: '/sponsors/parisjs.png' }
  ]

  return (
    <Layout>
      <Head>
        <title>Hello world</title>
        <meta name="description" content="Everything is awaysome!" />
      </Head>

      <div className="container">
        <h1>
          <FormattedMessage id="SPONSOR_TITLE" />
        </h1>
        <p>
          <FormattedHTMLMessage id="SPONSOR_INTRO" />
        </p>

        <ul className="sponsors__list">
          {sponsors.map(({ img, name }) => (
            <li key={name} className="sponsors__item">
              <figure className="card">
                <img src={img} alt={name} />
                <figcaption>{name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default SponsorsContainer
