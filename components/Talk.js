import React from 'react'

const Talk = ({ title, extract, authors, slides, projects }) => {
  return (
    <div className="Talk">
      <h3 className="Talk__title">{ title }</h3>
      <ul className="Talk_authors">
        { authors && authors.map(({ name, url, avatar}) => (
          <li key={ name }>{ name }</li>
        )) }
      </ul>
      <div className="Talk__description">{ extract }</div>
    </div>
  )
}

export default Talk
