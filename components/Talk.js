import React from 'react'

const Talk = ({ title, extract, authors, slides, projects }) => {
  return (
    <div>
      { title }
      <p>{ extract }</p>
      <ul>
        { authors && authors.map(({ name, url, avatar}) => (
          <li key={ name }>{ name }</li>
        )) }
      </ul>
    </div>
  )
}

export default Talk
