import Head from 'next/head'
import { FormattedMessage, useIntl } from 'react-intl'
import { sponsors } from '../lib/sponsors'

const SponsorCard = (props) => {
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
  const intl = useIntl()
  return (
    <>
      <FormattedMessage id="SPONSOR_TITLE">
        {([message]) => (
          <Head>
            <title>{message}</title>
          </Head>
        )}
      </FormattedMessage>

      <div className="container">
        <h1>
          <FormattedMessage id="SPONSOR_TITLE" />
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'SPONSOR_INTRO' }),
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
