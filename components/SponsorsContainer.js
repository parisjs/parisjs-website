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
    {
      name: 'Keymetrics',
      img: '/sponsors/keymetrics.jpg',
      website: 'https://keymetrics.io/',
      link: { name: 'Jobs', url: 'https://jobs.keymetrics.io/' }
    },
    {
      name: 'Algolia',
      img: '/sponsors/algolia-logo-light.png',
      website: 'https://www.algolia.com/',
      link: { name: 'Careers', url: 'https://www.algolia.com/careers' }
    },
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
          {sponsors.map(({ img, name, website, link }) => (
            <li key={name} className="sponsors__item">
              <figure className="card">
                <img src={img} alt={name} />
                <figcaption>
                  {website ? <a href={website}>{name}</a> : name}
                  {link && (
                    <p>
                      <a href={link.url}>{link.name}</a>
                    </p>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default SponsorsContainer
