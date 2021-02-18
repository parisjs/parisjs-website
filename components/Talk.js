import Avatar from './Avatar'

const TalkAuthor = ({ author }) => {
  const TagName = author.url ? 'a' : 'div'

  return (
    <TagName href={author.url} className="Talk_author">
      <Avatar imageUrl={author.avatar} size="small" />
      <div>{author.name}</div>
    </TagName>
  )
}

const Talk = ({ title, extract, authors, slides, links, videos }) => {
  return (
    <div className="Talk">
      <h3>{title}</h3>
      <div className="Talk_authors">
        {authors &&
          authors.map((author) => (
            <TalkAuthor key={author.name} name={author.name} author={author} />
          ))}
      </div>

      <div className="Talk__description">{extract}</div>

      <ul>
        {slides &&
          slides.map((slide, idx) => (
            <li key={idx}>
              <a href={slide}>{slide}</a>
            </li>
          ))}
      </ul>
      <ul>
        {links &&
          links.map((project, idx) => (
            <li key={idx}>
              <a href={project}>{project}</a>
            </li>
          ))}
      </ul>
      <ul>
        {videos &&
          videos.map((video, idx) => (
            <li key={idx}>
              <a href={video}>{video}</a>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Talk
