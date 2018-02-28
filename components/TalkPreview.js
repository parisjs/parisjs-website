import React from 'react'

import { Highlight } from 'react-instantsearch/dom'

import Avatar from './Avatar'

const HighlightedAuthors = ({ authors }) => {
  return authors.map(author => (
    <Highlight hit={{ _highlightResult: author }} attributeName="name" />
  ))
}

const TalkPreview = ({ talk, highlights }) => {
  const title = highlights ? (
    <Highlight hit={highlights} attributeName="title" />
  ) : (
    talk.title
  )

  const authors = highlights ? (
    <HighlightedAuthors authors={highlights._highlightResult.authors} />
  ) : (
    <span>
      {talk.authors && talk.authors.map(author => author.name).join(', ')}
    </span>
  )

  return (
    <div className="TalkPreview">
      {talk.authors &&
        talk.authors.map(author => (
          <Avatar key={author.name} imageUrl={author.avatar} />
        ))}
      <div>
        <strong>{title}</strong>
        {'\xa0-\xa0'}
        {authors}
      </div>
    </div>
  )
}

export default TalkPreview
