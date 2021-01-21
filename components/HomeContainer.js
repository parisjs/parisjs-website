import i18next from 'i18next'
import Head from 'next/head'
import {
  InstantSearch,
  SearchBox,
  PoweredBy,
  Configure,
  InfiniteHits,
} from 'react-instantsearch-dom'

import MeetupPreview from './MeetupPreview'
import NextMeetup from './NextMeetup'

const HomeContainer = (props) => {
  return (
    <>
      <Head>
        <title>Paris.JS - Event-driven community about JavaScript</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
          integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8="
          crossOrigin="anonymous"
        />
      </Head>
      <div className="hero">
        <div className="container">
          <h2>{i18next.t('HOME_HERO_TITLE')}</h2>
          <NextMeetup />
        </div>
      </div>
      <MeetupSearch {...props} />
    </>
  )
}

function MeetupSearch(props) {
  return (
    <div className="container meetups">
      <InstantSearch {...props}>
        <div className="meetups__header">
          <h2 className="meetups__title --withChevron">
            {i18next.t('HOME_PREVIOUS_MEETUP')}
          </h2>
          <Configure hitsPerPage={5} />
          <SearchBox
            showLoadingIndicator
            translations={{
              placeholder: i18next.t('SEARCH_PLACEHOLDER'),
            }}
          />
          <PoweredBy />
        </div>
        <InfiniteHits
          hitComponent={({ hit: meetup }) => (
            <MeetupPreview key={meetup.objectID} meetup={meetup} />
          )}
          translations={{
            loadMore: i18next.t('SEARCH_LOADMORE'),
          }}
        />
      </InstantSearch>
    </div>
  )
}

export default HomeContainer
