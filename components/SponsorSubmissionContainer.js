import React from 'react'
import Head from 'react-helmet'
import { createContainer, query, BodyRenderer } from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

const SponsorSubmissionContainer = () => (
  <Layout>
    <div>
      <Head>
        <title>Hello world</title>
        <meta name="description" content="Everything is awaysome!" />
      </Head>

      <form>
        <label>
          Entité (nom de la personne, école, entreprise, etc...) :
          <input type="text" name="who" required />
        </label>

        <label>
          Type
          <input type="checkbox" name="type" value="host" /> Lieu<br />
          <input type="checkbox" name="type" value="food" /> Buffet
        </label>

        <label>
          Nombre de places
          <input type="number" name="hostSize" required />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  </Layout>
)

export default SponsorSubmissionContainer
