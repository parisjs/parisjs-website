import React from 'react'
import Head from 'react-helmet'
import {
  createContainer,
  query,
  BodyRenderer
} from '@phenomic/preset-react-app/lib/client'
import { Link, withRouter } from 'react-router'
import { LocalLink } from '../intl'
import { FormattedMessage } from 'react-intl'

import { InstantSearch, SearchBox } from 'react-instantsearch/dom'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'
import NextMeetup from './NextMeetup'

const Home = ({ meetups, intl, router }) => (
  <Layout>
    <Head>
      <title>Paris.JS - Event-driven community about JavaScript</title>
      <meta name="description" content="" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/react-instantsearch-theme-algolia@4.4.2"
      />
    </Head>
    <div className="hero">
      <div className="container">
        <h2>
          <FormattedMessage id="HOME_HERO_TITLE" />
        </h2>
        <NextMeetup />
      </div>
    </div>
    <div className="container meetups">
      <InstantSearch
        appId="JTH1JDTDFT"
        apiKey="34a4c1b994546fbec45a670a06ba0c33"
        indexName="paris.js-meetups"
      >
        <div className="meetups__header">
          <h2 className="meetups__title --withChevron">
            <FormattedMessage id="HOME_PREVIOUS_MEETUP" />
          </h2>
          <SearchBox onClick={() => router.push('/search')} />
        </div>
        <ul className="meetups__list">
          {meetups &&
            meetups.node &&
            meetups.node.list &&
            meetups.node.list.map(meetup => (
              <li key={meetup.id}>
                <MeetupPreview {...meetup} />
              </li>
            ))}
        </ul>
        <p>
          {meetups &&
            meetups.node &&
            meetups.node.hasNextPage && (
              <LocalLink to={`/after/${meetups.node.next}`}>
                <FormattedMessage id="HOME_PREVIOUS_MEETUP" />
              </LocalLink>
            )}
        </p>
      </InstantSearch>
    </div>
  </Layout>
)

const HomeContainer = createContainer(withRouter(Home), props => ({
  meetups: query({ path: 'meetups', limit: 12, after: props.params.after })
}))

export default HomeContainer
