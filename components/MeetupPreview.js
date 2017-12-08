import React from 'react'
import { Link } from 'react-router'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { LocalLink } from '../intl'

const PagePreview = ({ id, edition, title, date, talks, host }) => {
  const pageDate = date ? new Date(date) : null

  return (
    <div className="MeetupPreview">
      <div className="MeetupPreview__title">
        <h3>
          <LocalLink to={ `/meetup/${ id }`}>
            Paris.js #{ edition } { host ? `@ ${host}` : '' }
          </LocalLink>
        </h3>
        <div>
          <time key={ pageDate.toISOString() }>
            <FormattedDate
              value={ pageDate }
              weekday='short'
              day='2-digit'
              month='long'
              year='numeric'
            />
          </time>
        </div>
      </div>

      <div>
        <ul>
        { talks && talks.map(({ title }) => (
          <li key={ title }>{ title }</li>
        )) }
        </ul>
      </div>
      <LocalLink to={ `/meetup/${ id }`}>
        <FormattedMessage id="PREVIEW_DETAIL" />
      </LocalLink>
    </div>
  )
}

export default PagePreview
