import React from 'react'
import Head from 'react-helmet'
import {
  createContainer,
  query,
  BodyRenderer
} from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'
import NextMeetup from './NextMeetup'

import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  Configure
} from 'react-instantsearch/dom'

function Meetup({ hit }) {
  return (
    <li key={hit.objectID}>
      <MeetupPreview {...hit} />
    </li>
  )
}

const SearchContainer = () => (
  <Layout>
    <Head>
      <title>Paris.JS - Event-driven community about JavaScript</title>
      <meta name="description" content="" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/react-instantsearch-theme-algolia@4.4.2"
      />
    </Head>
    <div className="container meetups">
      <InstantSearch
        appId="JTH1JDTDFT"
        apiKey="34a4c1b994546fbec45a670a06ba0c33"
        indexName="paris.js-meetups"
      >
        <Configure hitsPerPage={12} />
        <div className="meetups__header">
          <h2 className="meetups__title --withChevron">
            <FormattedMessage id="HOME_PREVIOUS_MEETUP" />
          </h2>
          <SearchBox autoFocus showLoadingIndicator />
        </div>
        <ul className="meetups__list">
          <InfiniteHits hitComponent={Meetup} />
        </ul>
      </InstantSearch>
    </div>
  </Layout>
)

export default SearchContainer
