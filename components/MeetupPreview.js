import React from 'react'
import { Link } from 'react-router'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { LocalLink } from '../intl'

const PagePreview = ({ id, edition, title, date, talks, host }) => {
  const pageDate = date ? new Date(date) : null

  return (
    <div>
      <LocalLink to={ `/meetup/${ id }`}>
        Paris.js #{ edition } chez { host }
      </LocalLink>

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
        <span> - Paris.js #{ edition } - Hebergé par { host }</span>
      </div>
      <div>
        <ul>
        { talks && talks.map(({ title }) => (
          <li key={ title }>{ title }</li>
        )) }
        </ul>
      </div>
      <LocalLink to={ `/meetup/${ id }`}>
        Detail →
      </LocalLink>
    </div>
  )
}

export default PagePreview
