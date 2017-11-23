import React from 'react'
import Head from 'react-helmet'
import { createContainer, query, BodyRenderer, textRenderer } from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'

import { getLocale } from '../intl'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

const FAQ = ({ hasError, isLoading, faq }) => (
  <Layout>
    { faq.node && (
      <article>
        <Head>
          <title>{ faq.node.title }</title>
          <meta
            name="description"
            content={ textRenderer(faq.node.body).slice(0, 150) + "…" }
          />
        </Head>
        <div className="container">
          <h1>{ faq.node.title }</h1>
          <BodyRenderer>{ faq.node.body }</BodyRenderer>
        </div>
      </article>
    ) }
  </Layout>
)

const FAQContainer = createContainer(FAQ, (props, context) => {
  const locale = getLocale(props.location ? props.location.pathname : '/faq')

  return {
    faq: query({ path: 'faq', id: locale }),
  }
})

export default FAQContainer
