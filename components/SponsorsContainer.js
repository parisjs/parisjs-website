import i18next from 'i18next'
import Head from 'next/head'
import Image from 'next/image'
import { sponsors } from '../lib/sponsors'

function SponsorCard(props) {
  return (
    <div className="card sponsor">
      <div className="sponsor__thumbnail">
        {props.website ? (
          <a href={props.website}>
            <Image src={props.img} layout="fill" objectFit="contain" alt={props.name} />
          </a>
        ) : (
          <Image src={props.img} layout="fill" objectFit="contain" alt={props.name} />
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

function SponsorsContainer() {
  return (
    <>
      <Head>
        <title>{i18next.t('SPONSOR_TITLE')}</title>
      </Head>

      <div className="container">
        <h1>{i18next.t('SPONSOR_TITLE')}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: i18next.t('SPONSOR_INTRO'),
          }}
        />
        <ul className="sponsors__list">
          {sponsors.map((sponsor) => (
            <li key={sponsor.name} className="sponsors__item">
              <SponsorCard {...sponsor} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SponsorsContainer
