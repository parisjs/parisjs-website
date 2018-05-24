import React from 'react'
import Head from 'react-helmet'
import {
  withPhenomicApi,
  query,
  BodyRenderer
} from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'
import { injectIntl, FormattedMessage } from 'react-intl'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'
import NextMeetup from './NextMeetup'

import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  PoweredBy,
  Configure
} from 'react-instantsearch/dom'

function Meetup({ hit }) {
  return (
    <li key={hit.objectID}>
      <MeetupPreview {...hit} />
    </li>
  )
}

const Search = injectIntl(({ intl }) => (
  <div className="container meetups">
    <InstantSearch
      appId="KQPF9BC268"
      apiKey="5eabe9bbceee31443c075723136fa826"
      indexName="paris.js-meetups"
    >
      <Configure hitsPerPage={12} />
      <div className="meetups__header">
        <h2 className="meetups__title --withChevron">
          <FormattedMessage id="HOME_PREVIOUS_MEETUP" />
        </h2>
        <SearchBox
          autoFocus
          showLoadingIndicator
          translations={{
            placeholder: intl.formatMessage({ id: 'SEARCH_PLACEHOLDER' })
          }}
        />
        <PoweredBy />
      </div>
      <ul className="meetups__list">
        <InfiniteHits
          hitComponent={Meetup}
          translations={{
            loadMore: intl.formatMessage({ id: 'SEARCH_LOADMORE' })
          }}
        />
      </ul>
    </InstantSearch>
  </div>
))

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
    <Search />
  </Layout>
)

export default SearchContainer
