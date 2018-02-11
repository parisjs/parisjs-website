import React from 'react'
import { Link } from 'react-router'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { LocalLink } from '../intl'
import { Highlight } from 'react-instantsearch/dom'

import TalkPreview from './TalkPreview'

const Host = function({ host, meetup }) {
  if (!host) return <span />
  console.log(meetup)
  const h = meetup._highlightResult ? (
    <Highlight hit={meetup} attributeName="host" />
  ) : (
    host
  )
  return <span>@ {h}</span>
}

const PagePreview = meetup => {
  const { id, edition, title, date, talks, host } = meetup
  const pageDate = date ? new Date(date) : null

  return (
    <LocalLink to={`/meetup/${id}`} className="MeetupPreview">
      <div className="MeetupPreview__title">
        <h3>
          Paris.js #{edition} <Host host={host} meetup={meetup} />
        </h3>
        <div>
          <time key={pageDate.toISOString()}>
            <FormattedDate
              value={pageDate}
              weekday="short"
              day="2-digit"
              month="long"
              year="numeric"
            />
          </time>
        </div>
      </div>

      <div className="MeetupPreview__talks">
        {talks &&
          talks.map(talk => <TalkPreview key={talk.title} talk={talk} />)}
        {talks && talks.length % 2 > 0 && <div className="TalkPreview" />}
      </div>
    </LocalLink>
  )
}

export default PagePreview
