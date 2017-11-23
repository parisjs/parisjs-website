import React from 'react'
import Head from 'react-helmet'
import { createContainer, query, BodyRenderer } from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

const TalkSubmissionContainer = () => (
  <Layout>
    <Head>
      <title>Hello world</title>
      <meta name="description" content="Everything is awaysome!" />
    </Head>

    <div className="container">
      <h1>Proposer un sujet</h1>
      <form>
        <div>
          <label>Titre</label>
          <input type="text" name="title" required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="extract" required></textarea>
        </div>
        <div>
          <label>Format</label>
          <label><input type="radio" name="format" value="long" checked /> Long (20mins)</label>
          <label><input type="radio" name="format" value="short" /> Court (5mins)</label>
        </div>
        <div>
          <label>Slides</label>
          <input type="url" name="slides" />
        </div>
        <div>
          <label>Lien</label>
          <input type="url" name="project" />
        </div>
        <div>
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </div>
  </Layout>
)

export default TalkSubmissionContainer
