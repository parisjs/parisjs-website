import { Highlight, Snippet } from 'react-instantsearch-hooks-web'
import Avatar from './Avatar'

const TalkPreview = ({ talk }) => {
  const avatars =
    talk.authors &&
    talk.authors.map((author, index) => (
      <div key={`${author.name}-${index}`}>
        <Avatar name={author.name} imageUrl={author.avatar} />
      </div>
    ))
  const authors = talk.authors.map((_author, index) => (
    <Highlight
      key={String(index)}
      hit={talk}
      attribute={`authors.${index}.name`}
      highlightedTagName="em"
    />
  ))

  return (
    <div className="TalkPreview">
      <div className="TalkPreview_avatars">{avatars}</div>
      <div className="TalkPreview__description">
        <div>
          <div className="TalkPreview__title">
            {<Snippet hit={talk} attribute="title" highlightedTagName="em" />}
          </div>
          <div className="TalkPreview__authors">{authors}</div>
        </div>
        <div className="TalkPreview__extract">
          <Snippet hit={talk} attribute="extract" highlightedTagName="em" />
        </div>
      </div>
    </div>
  )
}

export default TalkPreview
