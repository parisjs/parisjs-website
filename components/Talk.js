import React from 'react'

const Talk = ({ title, extract, authors, slides, links, videos }) => {
  return (
    <div className="Talk">
      <h3 className="Talk__title">{ title }</h3>
      <ul className="Talk_authors">
        { authors && authors.map(({ name, url, avatar}) => (
          <li key={ name }>
            { avatar && <img src={ avatar } />}
            { url ? <a href={ url }>{ name }</a> : name }
          </li>
        )) }
      </ul>
      <div className="Talk__description">{ extract }</div>
      <ul>
        { slides && slides.map((slide, idx) => (
          <li key={ idx }><a href={ slide }>{ slide }</a></li>
        )) }
      </ul>
      <ul>
        { links && links.map((project, idx) => (
          <li key={ idx }><a href={ project }>{ project }</a></li>
        )) }
      </ul>
      <ul>
        { videos && videos.map((video, idx) => (
          <li key={ idx }><a href={ video }>{ video }</a></li>
        )) }
      </ul>
    </div>
  )
}

export default Talk
