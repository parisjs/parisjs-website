import algoliasearch from 'algoliasearch/lite'
import { findResultsState } from 'react-instantsearch-dom/server'
import { useState } from 'react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'

import HomeContainer from '../components/HomeContainer'
import { initI18next } from '../lib/intl'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
)

const DEFAULT_PROPS = {
  searchClient,
  indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
}

export async function getStaticProps({ router, locale }) {
  initI18next(locale)
  const searchState = {}

  function ServerSideSearch(props) {
    return (
      <RouterContext.Provider value={router}>
        <HomeContainer {...props} />
      </RouterContext.Provider>
    )
  }
  const resultsState = await findResultsState(ServerSideSearch, {
    ...DEFAULT_PROPS,
    searchState,
  })

  return {
    props: {
      resultsState: {
        ...resultsState,
        metadata: [],
        state: JSON.parse(JSON.stringify(resultsState.state)),
      },
      searchState,
    },
  }
}

export default function Index(props) {
  const [searchState, setSearchState] = useState(props.searchState)
  return (
    <HomeContainer
      {...{
        ...DEFAULT_PROPS,
        searchState,
        onSearchStateChange: setSearchState,
        createURL: () => {},
        resultsState: props.resultsState,
      }}
    />
  )
}
