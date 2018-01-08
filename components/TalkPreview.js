import React from 'react'

import Avatar from './Avatar'

const TalkPreview = ({ talk }) => {
  const { authors, title } = talk

  return (
    <div className="TalkPreview">
      { authors && authors.map((author) => (
        <Avatar imageUrl={author.avatar} />
      )) }
      <div>
        <strong>{ title }</strong>
        { '\xa0-\xa0' }
        <span>
        {
          authors && authors.map((author) => author.name).join(', ')
        }
        </span>
      </div>
    </div>
  )
}

export default TalkPreview
