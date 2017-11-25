import React from 'react'
import Head from 'react-helmet'
import { createContainer, query, BodyRenderer } from '@phenomic/preset-react-app/lib/client'

// multi layouts @see https://github.com/phenomic/phenomic/blob/master/packages/preset-react-app/docs/getting-started/7.md @todo !

import PageError from './PageError'
import Layout from './Layout'
import Talk from './Talk'

const Meetup = ({ hasError, meetup }) => {
  if (hasError) {
    return <PageError error={ meetup.error } />
  }

  return (
    <Layout>
      { meetup.node && (
        <article>
          <Head>
            <title>{ `Paris.js #${ meetup.node.edition } chez ${ meetup.node.host }` }</title>
            <meta name="description" content={"" /* meetup.node.body.slice(0, 50)*/} />
          </Head>
          <div className="container">
            <h1>Paris.js #{ meetup.node.edition } chez { meetup.node.host }</h1>
            <div>
              <ul>
              { meetup.node.talks && meetup.node.talks.map((talk) => (
                <li key={ talk.title }>
                  <Talk { ...talk } />
                </li>
              )) }
              </ul>
            </div>
          </div>
        </article>
      ) }
    </Layout>
  )
}

const BlogPostContainer = createContainer(Meetup, (props) => ({
  meetup: query({ path: 'meetups', id: props.params.splat }),
}))

export default BlogPostContainer
