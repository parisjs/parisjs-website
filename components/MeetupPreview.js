import React from 'react'
import { Link } from 'react-router'

const PagePreview = ({ id, edition, title, date, talks, host }) => {
  const pageDate = date ? new Date(date) : null

  return (
    <div>
      <Link to={ `/meetup/${ id }`}>
        Paris.js #{ edition } chez { host }
      </Link>

      <div>
        <time key={ pageDate.toISOString() }>
          { pageDate.toDateString() }
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
      <Link to={ `/meetup/${ id }`}>
        Detail →
      </Link>
    </div>
  )
}

export default PagePreview
