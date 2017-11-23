import React from 'react'
import Head from 'react-helmet'
import { createContainer, query, BodyRenderer } from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'
import { LocalLink } from '../intl'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

const Home =  ({ meetups }) => (
  <Layout>
    <Head>
      <title>Paris.JS - Event-driven community about JavaScript</title>
      <meta name="description" content="Everything is awaysome!" />
    </Head>
    <div className="hero">
      <div className="container">
        <h2>Meetup mensuel autour de JavaScript</h2>
        <h3>Prochain meetup:</h3>
        <div className="hero__actions">
          <a className="btn" href="https://www.meetup.com/fr-FR/Paris-js/">Inscriptions sur Meetup.com</a>
          <p>
            Rejoignez aussi la communauté sur
            { " " }
            <a href="https://slack-francejs.now.sh/">
              <img src="assets/icons/icon-slack.svg" alt="" width="24" height="24" /> Slack
            </a> 
            { " " }
            <a href="https://twitter.com/parisjs">
              <img src="assets/icons/icon-twitter.svg" alt="" width="24" height="24" /> Twitter
            </a> 
            { " " }
            <a href="http://groups.google.com/group/parisjs">
              <img src="assets/icons/icon-google.svg" alt="" width="24" height="24" /> Google Groups
            </a>
          </p>
        </div>
      </div>
    </div>
    <div className="container meetups">
      <h2 className="meetups__title --withChevron">Précédents meetups</h2>
      <ul className="meetups__list">
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
          <LocalLink to={ `/after/${ meetups.node.next }`}>Older meetups</LocalLink>
        }
      </p>
    </div>
  </Layout>
)

const HomeContainer = createContainer(Home, (props) => ({
  meetups: query({ path: 'meetups', limit: 12, after: props.params.after }),
}))

export default HomeContainer
