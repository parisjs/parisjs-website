import { Highlight } from 'react-instantsearch-dom'
import i18next from 'i18next'
import Link from 'next/link'
import TalkPreview from './TalkPreview'

function Host({ meetup }) {
  return (
    <span>
      @ <Highlight hit={meetup} attribute="host" />
    </span>
  )
}

const PagePreview = ({ meetup }) => {
  const { id, edition, date, talks } = meetup
  const pageDate = date ? new Date(date) : null

  return (
    <Link href={`/meetup/${id}`}>
      <a className="MeetupPreview">
        <div className="MeetupPreview__title">
          <h3>
            Paris.js #{edition} <Host meetup={meetup} />
          </h3>
          <div>
            <time dateTime={pageDate.toISOString()}>
              {pageDate.toLocaleDateString(i18next.language, {
                weekday: 'short',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>

        <div className="MeetupPreview__talks">
          {talks &&
            talks.map((talk, i) => {
              const highlights = meetup._highlightResult?.talks
                ? { _highlightResult: meetup._highlightResult.talks[i] }
                : undefined
              return (
                <TalkPreview
                  key={talk.title}
                  talk={{ ...talk, ...highlights }}
                />
              )
            })}
          {talks && talks.length % 2 > 0 && <div className="TalkPreview" />}
        </div>
      </a>
    </Link>
  )
}

export default PagePreview
