import React from 'react'
import Head from 'react-helmet'
import { createContainer, query, BodyRenderer } from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

const Home =  ({ meetups }) => (
  <Layout>
    <Head>
      <title>Hello world</title>
      <meta name="description" content="Everything is awaysome!" />
    </Head>
    <h1>Home</h1>
    <ul>
      { meetups && meetups.node && meetups.node.list &&
        meetups.node.list.map((meetup) => (
          <li key={ meetup.id }>
            <MeetupPreview { ...meetup } />
          </li>
        ))
      }
    </ul>
    <p>
      {
        meetups && meetups.node && meetups.node.hasNextPage &&
        <Link to={ `/after/${ meetups.node.next }`}>Older meetups</Link>
      }
    </p>
  </Layout>
)

const HomeContainer = createContainer(Home, (props) => ({
  meetups: query({ path: 'meetups', limit: 12, after: props.params.after }),
}))

export default HomeContainer
