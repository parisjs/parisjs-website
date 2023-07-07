import algoliasearch from 'algoliasearch/lite'
import { getServerState } from 'react-instantsearch-hooks-server'
import { renderToString } from 'react-dom/server'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import HomeContainer from '../components/HomeContainer'
import { initI18next } from '../lib/intl'
import { getNextMeetup } from '../lib/meetups'

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

  function ServerSideSearch(props) {
    return (
      <RouterContext.Provider value={router}>
        <HomeContainer {...props} />
      </RouterContext.Provider>
    )
  }
  const serverState = await getServerState(
    <ServerSideSearch {...DEFAULT_PROPS} />,
    { renderToString }
  )

  // load the next scheduled meetup
  const nextMeetup = await getNextMeetup()
  return {
    props: {
      serverState,
      nextMeetup,
    },
    // Incremental Static Regeneration each minute
    revalidate: 60,
  }
}

export default function Index(props) {
  return <HomeContainer {...DEFAULT_PROPS} {...props} />
}
