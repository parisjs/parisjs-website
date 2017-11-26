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

    <div className="container talkSubmission">
      <h1>Proposer un sujet</h1>
      <form class="card talkSubmission__form">
        <div className="formGroup">
          <label for="talkSubmission-title">Titre</label>
          <input type="text" name="title" required id="talkSubmission-title" />
        </div>
        <div className="formGroup">
          <label for="talkSubmission-extract">Description</label>
          <textarea name="extract" required rows="12" id="talkSubmission-extract"></textarea>
        </div>
        <div className="formGroup">
          <label>Format</label>
          <label><input type="radio" name="format" value="long" checked /> Long (20mins)</label>
          <label><input type="radio" name="format" value="short" /> Court (5mins)</label>
        </div>
        <div className="formGroup">
          <label for="talkSubmission-slides">Slides</label>
          <input type="url" name="slides" placeholder="https://" id="talkSubmission-slides" />
        </div>
        <div className="formGroup">
          <label for="talkSubmission-project">Lien</label>
          <input type="url" name="project" placeholder="https://" id="talkSubmission-project" />
        </div>
        <div className="formGroup">
          <input type="submit" value="Envoyer" className="btn" />
        </div>
      </form>
    </div>
  </Layout>
)

export default TalkSubmissionContainer
