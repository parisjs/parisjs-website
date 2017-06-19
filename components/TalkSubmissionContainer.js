import React from 'react'
import Head from 'react-helmet'
import { createContainer, query, BodyRenderer } from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

const TalkSubmissionContainer = () => (
  <Layout>
    <div>
      <Head>
        <title>Hello world</title>
        <meta name="description" content="Everything is awaysome!" />
      </Head>

      <form>
        <label>
          Titre
          <input type="text" name="title" required />
        </label>
        <label>
          Description
          <textarea name="extract" required></textarea>
        </label>
        <label>
          Format
          <input type="radio" name="format" value="long" checked /> Long (20mins)<br />
          <input type="radio" name="format" value="short" /> Court (5mins)
        </label>
        <label>
          Slides
          <input type="url" name="slides" />
        </label>
        <label>
          Lien
          <input type="url" name="project" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </Layout>
)

export default TalkSubmissionContainer
