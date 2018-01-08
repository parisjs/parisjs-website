import React from 'react'
import { Link } from 'react-router'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { LocalLink } from '../intl'

import TalkPreview from './TalkPreview'

const PagePreview = ({ id, edition, title, date, talks, host }) => {
  const pageDate = date ? new Date(date) : null

  return (
    <LocalLink to={`/meetup/${id}`} className="MeetupPreview">
      <div className="MeetupPreview__title">
        <h3>
          <LocalLink to={`/meetup/${id}`}>
            Paris.js #{edition} {host ? `@ ${host}` : ''}
          </LocalLink>
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
