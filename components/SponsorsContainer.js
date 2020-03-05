import React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import Layout from './Layout'

const sponsors = [
  {
    name: 'Aircall',
    img: '/sponsors/aircall.png',
    website: 'https://aircall.io/',
    link: {
      name: 'Emplois',
      url: 'https://aircall.io/careers/'
    }
  },
  {
    name: 'MeilleursAgents',
    img: '/sponsors/meilleursagents.jpeg',
    website: 'https://www.meilleursagents.com/',
    link: {
      name: 'Carrière',
      url: 'https://carriere.meilleursagents.com/departments/tech'
    }
  },
  {
    name: 'Voodoo',
    img: '/sponsors/voodoo.jpg',
    website: 'https://www.voodoo.io/',
    link: {
      name: 'Careers',
      url: 'https://www.voodoo.io/careers'
    }
  },
  {
    name: 'Alan',
    img: '/sponsors/alan.png',
    website: 'https://alan.com/',
    link: {
      name: 'Job',
      url: 'https://angel.co/company/alan-25/jobs'
    }
  },
  {
    name: 'Datadog',
    img: '/sponsors/datadog.png',
    website: 'https://www.datadoghq.com/',
    link: {
      name: 'Careers',
      url: 'https://www.datadoghq.com/careers/'
    }
  },
  {
    name: 'Doctrine',
    img: '/sponsors/doctrine.png',
    website: 'https://www.doctrine.fr/',
    link: {
      name: 'Recrutement',
      url: 'https://www.doctrine.fr/recrutement'
    }
  },
  {
    name: 'Dailymotion',
    img: '/sponsors/dailymotion.png',
    website: 'https://www.dailymotion.com/',
    link: {
      name: 'Jobs',
      url: 'https://jobs.dailymotion.com/'
    }
  },
  {
    name: 'Payfit',
    img: '/sponsors/payfit.png',
    website: 'https://payfit.com/',
    link: {
      name: 'Carrieres',
      url: 'https://payfit.com/fr/carrieres'
    }
  },
  {
    name: 'Toucan Toco',
    img: '/sponsors/toucantoco.png',
    website: 'https://toucantoco.com/fr/',
    link: {
      name: 'Jobs',
      url: 'https://toucantoco.com/fr/team.html#jobs'
    }
  },
  {
    name: 'BAM',
    img: '/sponsors/bam.jpg',
    website: 'https://www.bam.tech/',
    link: {
      name: 'Jobs',
      url: 'https://www.bam.tech/equipe-bam#jobs'
    }
  },
  {
    name: 'Abbeal',
    img: '/sponsors/abbeal.png',
    website: 'http://www.abbeal.com/',
    link: {
      name: 'jobs',
      url: 'https://www.welcometothejungle.co/companies/abbeal/jobs'
    }
  },
  {
    name: 'Chauffeur Privé',
    img: '/sponsors/chauffeurprive.svg',
    website: 'https://www.chauffeur-prive.com/',
    link: {
      name: 'Jobs',
      url: 'https://engineering.chauffeur-prive.com/jobs#jobs'
    }
  },
  {
    name: 'Everoad',
    img: '/sponsors/everoad.png',
    website: 'https://www.everoad.com/',
    link: {
      name: 'Jobs',
      url: 'https://www.welcometothejungle.co/companies/everoad/jobs'
    }
  },
  {
    name: 'Doctolib',
    img: '/sponsors/doctolib.png',
    website: 'https://www.doctolib.fr/',
    link: {
      name: 'Careers',
      url: 'https://careers.doctolib.fr/'
    }
  },
  {
    name: 'Oodrive',
    img: '/sponsors/oodrive.jpg',
    website: 'https://www.oodrive.com',
    link: {
      name: 'Careers',
      url: 'https://careers.oodrive.com/'
    }
  },
  {
    name: 'Scaleway',
    img: '/sponsors/scaleway.jpeg',
    website: 'https://www.scaleway.com/',
    link: {
      name: 'Careers',
      url: 'https://careers.scaleway.com/'
    }
  },
  {
    name: 'LaPiscine',
    img: '/sponsors/lapiscine.jpeg',
    website: 'http://www.lapiscine.io/',
    link: {
      name: 'Careers',
      url: 'https://www.margo-group.com/nous-rejoindre/'
    }
  },
  {
    name: 'Kpler',
    img: '/sponsors/kpler.png',
    website: 'http://www.kpler.com/',
    link: { name: 'Careers', url: 'https://careers.kpler.com/' }
  },
  {
    name: 'Keymetrics',
    img: '/sponsors/keymetrics.jpg',
    website: 'https://keymetrics.io/',
    link: { name: 'Jobs', url: 'https://jobs.keymetrics.io/' }
  },
  {
    name: 'Algolia',
    img: '/sponsors/algolia-logo-light.png',
    website: 'https://www.algolia.com/',
    link: { name: 'Careers', url: 'https://www.algolia.com/careers' }
  }
]

const SponsorCard = props => {
  return (
    <div className="card sponsor">
      <div className="sponsor__thumbnail">
        {props.website ? (
          <a href={props.website}>
            <img src={props.img} alt={props.name} />
          </a>
        ) : (
          <img src={props.img} alt={props.name} />
        )}
      </div>
      <div className="sponsor__info">
        <span className="sponsor__name">{props.name}</span>

        <div className="sponsor__links">
          {props.website && <a href={props.website}>Website</a>}{' '}
          {props.link && <a href={props.link.url}>{props.link.name}</a>}
        </div>
      </div>
    </div>
  )
}

const SponsorsContainer = () => {
  return (
    <Layout>
      <FormattedMessage id="SPONSOR_TITLE">
        {message => (
          <Helmet>
            <title>{message}</title>
          </Helmet>
        )}
      </FormattedMessage>

      <div className="container">
        <h1>
          <FormattedMessage id="SPONSOR_TITLE" />
        </h1>
        <p>
          <FormattedHTMLMessage id="SPONSOR_INTRO" />
        </p>

        <ul className="sponsors__list">
          {sponsors.map(sponsor => (
            <li key={sponsor.name} className="sponsors__item">
              <SponsorCard {...sponsor} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default SponsorsContainer
