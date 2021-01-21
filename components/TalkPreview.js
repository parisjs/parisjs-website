import { Highlight } from 'react-instantsearch-dom'
import Avatar from './Avatar'

const TalkPreview = ({ talk }) => {
  const title = <Highlight hit={talk} attribute="title" />

  const authors = talk.authors.map((_author, index) => (
    <Highlight hit={talk} attribute={`authors.${index}.name`} />
  ))

  return (
    <div className="TalkPreview">
      {talk.authors &&
        talk.authors.map((author) => (
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
