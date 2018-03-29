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
  }
]

const SponsorCard = props => {
  return (
    <div className="card sponsor">
      <div className="sponsor__thumbnail">
        {props.website ? (
          <a href={props.website}>
            <img src={props.img} alt={props.name} />
          </a>
        ) : (
          <img src={props.img} alt={props.name} />
        )}
      </div>
      <div className="sponsor__info">
        <span className="sponsor__name">{props.name}</span>

        <div class="sponsor__links">
          {props.website && <a href={props.website}>Website</a>}{' '}
          {props.link && <a href={props.link.url}>{props.link.name}</a>}
        </div>
      </div>
    </div>
  )
}

const SponsorsContainer = () => {
  return (
    <Layout>
      <Head>
        <title>
          <FormattedMessage id="SPONSOR_TITLE" />
        </title>
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
          {sponsors.map(sponsor => (
            <li key={sponsor.name} className="sponsors__item">
              <SponsorCard {...sponsor} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default SponsorsContainer
