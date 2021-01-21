import Head from 'next/head'
import { FormattedMessage } from 'react-intl'
import Talk from './Talk'

export const Meetup = ({ meetup }) => {
  return (
    <article>
      <Head>
        <title>{`Paris.js #${meetup.edition} chez ${meetup.host}`}</title>
        <meta name="description" content={getDescription(meetup)} />
      </Head>
      <div className="container meetupContainer">
        <div className="meetupContainer__title">
          <h1>Paris.js #{meetup.edition}</h1>
          {meetup.host && (
            <h2>
              <FormattedMessage
                id="MEETUP_HOSTEB_BY"
                values={{ name: meetup.host }}
              />
            </h2>
          )}
          {meetup.meetupLink && (
            <a href={meetup.meetupLink}>
              <FormattedMessage id="MEETUP_LINK" />
            </a>
          )}
        </div>
        <div>
          <ul className="meetupContainer__list">
            {meetup.talks &&
              meetup.talks.map((talk) => (
                <li key={talk.title} className="meetupContainer__item">
                  <Talk {...talk} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function getDescription(meetup) {
  const description = meetup.talks
    ? meetup.talks.map((talk) => talk.extract).join(', ')
    : ''
  if (description.length > 50) {
    return description.slice(0, 50) + '…'
  }
  return description
}
